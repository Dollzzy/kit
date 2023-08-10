const sysElement = document.getElementById("sys");
let startupWindow;
let highestZIndex = 1; // Variabila pentru a urmări cel mai mare zIndex
let activeWindow = null; // Variabilă pentru a urmări fereastra activă

function createWindow(title, content, options = {}) {
    const windowDiv = document.createElement("div");
    windowDiv.className = "window";
    windowDiv.style.zIndex = highestZIndex++;

    const titleBar = document.createElement("div");
    titleBar.className = "title-bar";

    const titleText = document.createElement("span");
    titleText.textContent = title;
    titleBar.appendChild(titleText);

    if (!options.noCloseButton) {
        const closeButton = document.createElement("span");
        closeButton.className = "close-button";
        closeButton.textContent = "X";
        closeButton.addEventListener("click", function () {
            sysElement.removeChild(windowDiv);
        });

        titleBar.appendChild(closeButton);
    }

    if (options.resizable === false) {
        windowDiv.classList.add("non-resizable");
    }

    if (options.footer) {
        const footerDiv = document.createElement("div");
        footerDiv.className = "footer";

        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.className = "footer-button";
        closeButton.addEventListener("click", function () {
            sysElement.removeChild(windowDiv);
        });

        footerDiv.appendChild(closeButton);
        windowDiv.appendChild(footerDiv);
    }

    windowDiv.appendChild(titleBar);

    const contentDiv = document.createElement("div");
    contentDiv.className = "content";
    contentDiv.innerHTML = content;

    windowDiv.appendChild(contentDiv);

    sysElement.appendChild(windowDiv);

    if (!options.noDrag && title !== "Startup") {
        makeWindowDraggable(windowDiv, titleBar);
    }

    if (options.width) {
        windowDiv.style.width = options.width + "px";
    }

    if (options.height) {
        windowDiv.style.height = options.height + "px";
    }

    if (options.x !== undefined && options.y !== undefined) {
        windowDiv.style.left = options.x + "px";
        windowDiv.style.top = options.y + "px";
    }

    // Actualizează fereastra activă
    activeWindow = windowDiv;

    return windowDiv;
}

function makeWindowDraggable(windowDiv, handle) {
    let offsetX, offsetY;
    let dragging = false;

    handle.addEventListener("mousedown", function (e) {
        if (e.target === handle) {
            // Adaugă aducerea ferestrei în prim-plan
            bringWindowToFront(windowDiv);

            dragging = true;
            offsetX = e.clientX - windowDiv.getBoundingClientRect().left;
            offsetY = e.clientY - windowDiv.getBoundingClientRect().top;
        }
    });

    document.addEventListener("mousemove", function (e) {
        if (!dragging) return;

        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;

        const maxX = window.innerWidth - windowDiv.offsetWidth;
        const maxY = window.innerHeight - windowDiv.offsetHeight;

        const clampedX = Math.min(Math.max(newX, 0), maxX);
        const clampedY = Math.min(Math.max(newY, 0), maxY);

        windowDiv.style.left = clampedX + "px";
        windowDiv.style.top = clampedY + "px";
    });

    document.addEventListener("mouseup", function () {
        dragging = false;
    });
}

function bringWindowToFront(windowDiv) {
    if (activeWindow !== windowDiv) {
        windowDiv.style.zIndex = highestZIndex++;
        activeWindow = windowDiv;
    }
}

let contextMenu = null; // Definim variabila pentru meniul contextual


if (document.addEventListener) {
  document.addEventListener('contextmenu', function(e) {
    // Creăm un buton pentru fereastra de bun venit
    const welcomeButton = document.createElement("button");
    welcomeButton.textContent = "Bun venit";
    welcomeButton.className = "context-menu-button";

    // Adăugăm evenimentul de click pentru deschiderea ferestrei de bun venit
    welcomeButton.addEventListener("click", function() {
      const welcomeContent = "Bun venit pe  kitul dzy";
      createWindow("Bun venit", welcomeContent, {
        width: 300,
        height: 150
      });
      sysElement.removeChild(contextMenu);
    });    
        contextMenu = document.createElement("div"); // Salvăm referința la meniul creat
        contextMenu.className = "context-menu";
        contextMenu.appendChild(welcomeButton);
        
        contextMenu.style.left = e.clientX + "px";
        contextMenu.style.top = e.clientY + "px";
        document.body.appendChild(contextMenu);
    
        e.preventDefault();
      }, false);
    
      // Ascundem meniul când se face clic stânga oriunde în afara meniului
      document.addEventListener('click', function(e) {
        if (contextMenu) {
          document.body.removeChild(contextMenu);
          contextMenu = null; // Resetați variabila la null
        }
      });
    } else {
      document.attachEvent('oncontextmenu', function() {
        alert("meniul nu mai functioneaza");
        window.event.returnValue = false;
      });
    }
    

    
function createMenu() {
    const menuContent = `
            <button id="aboutButton">app1</button>
            <button id="settingsButton">app2</button>
    `;

    const menuWindow = createWindow("Menu", menuContent);

    const aboutButton = document.getElementById("aboutButton");
    aboutButton.addEventListener("click", function () {
        createWindow("app1", "test", { 
            width: 300, 
            height: 150 
        });
        bringWindowToFront(menuWindow);
    });

    const settingsButton = document.getElementById("settingsButton");
    settingsButton.addEventListener("click", function () {
        createWindow("app2", "test", { 
            width: 300, 
            height: 150 
        });
        bringWindowToFront(menuWindow);
    });
}


function createStartupWindow() {
    const startupWindowContent = `
        <div class="startup-input-container">
            <label for="username">introduceti numele:</label>
            <input type="text" id="username"  class="startup-input"  placeholder="Nume">
        </div>
    `;
    startupWindow = createWindow("Startup", startupWindowContent, { 
        width: 400, 
        height: 200,
        resizable:false,
        noCloseButton:true
    });

    const footerDiv = document.createElement("div");
    footerDiv.className = "footer";

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.id = "nextButton";
    nextButton.addEventListener("click", function () {
        const username = document.getElementById("username").value;
        const welcomeContent = `Bun venit, ${username}!<br>acesta este kitul de system dzy`;
        createWindow("Bun venit", welcomeContent);
        
        sysElement.removeChild(startupWindow);
        menuButton.style.display = "block"; // Afisam butonul de meniu
    });
    const dzyKitText = document.createElement("span");
    dzyKitText.textContent = "Dzy kit"; // Textul dorit

    footerDiv.appendChild(dzyKitText);
    footerDiv.appendChild(nextButton);
    startupWindow.appendChild(footerDiv);
}



// Restul codului pentru crearea butonului de meniu și gestionarea evenimentelor rămâne neschimbat

createStartupWindow();

const taskbar = document.createElement("div");
taskbar.className = "taskbar";

const menuButton = document.createElement("button");
menuButton.textContent = "Menu";
menuButton.className = "menu-button";
menuButton.style.display = "none"; // Butonul este inițial invizibil

// Actualizăm evenimentul click pentru butonul de meniu
menuButton.addEventListener("click", function () {
    createMenu();
    bringWindowToFront(menuWindow);
});

taskbar.appendChild(menuButton);

document.body.appendChild(taskbar);
