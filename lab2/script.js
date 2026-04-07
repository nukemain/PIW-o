const input = document.getElementById('todoInput');
const priorityInput = document.getElementById('todoPriority'); // priorytet
const colorInput = document.getElementById('todoColor'); // kolor
const fontSizeInput = document.getElementById('todoFontSize'); // rozmiar
const button = document.getElementById('addBtn');

const listHigh = document.getElementById('todoListHigh');
const listLow = document.getElementById('todoListLow');

// Elementy dialogu
const deleteModal = document.getElementById('delete-modal');
const modalText = document.getElementById('delete-modal-text');
let zadanieDoUsuniecia = null;

//"close" z elementu <dialog>
deleteModal.addEventListener('close', () => {
    if (deleteModal.returnValue === 'yes' && zadanieDoUsuniecia) {
        zadanieDoUsuniecia.remove();
    }
    zadanieDoUsuniecia = null; //na błąd braku tej linijki poświęciłem dobre 10 minut
    deleteModal.returnValue = '';
});

button.addEventListener('click', () => {
    const text = input.value.trim();
    const wybranyPriorytet = priorityInput.value; //priorytet
    const wybranyKolor = colorInput.value; //klolor
    const wybranyRozmiar = fontSizeInput.value; //rozmiar

    if (text !== '') {
        const li = document.createElement('li'); //li bo to element listy ul
        li.className = 'lista-zadanie'; // przypięcie całej sekcji tła przez klasę z style.css
        li.style.color = wybranyKolor; //kolor li
        li.style.fontSize = wybranyRozmiar + 'px'; //w px
        //tekst
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        //X
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'przycisk-usun';

        //klik i odklik
        li.addEventListener('click', () => {
            //togglem włączyć/wyłączyć striketrough i kolor szary
            textSpan.classList.toggle('zadanie-zrobione');
            if (!textSpan.classList.contains('zadanie-zrobione')) {
                //oryginalny tekst
                textSpan.textContent = text;
            } else {
                const dzisiaj = new Date();//dzisiejsza data
                //12:34 6.04.2026 <coś takiego
                const sformatowanaData = dzisiaj.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }) + ' ' + dzisiaj.toLocaleDateString('pl-PL');
                textSpan.textContent = text + ` (Wykonano: ${sformatowanaData})`;
            }
        });

        //przycisk X
        deleteBtn.addEventListener('click', (event) => {
            zadanieDoUsuniecia = li; //li do zmiennej żeby dalo się go wyciągnąć do funkcji close (wyżej)
            modalText.textContent = `Czy na pewno chcesz usunąć zadanie o treści: ${text}`;
            deleteModal.showModal();
        });

        //tekst i przycisk do li
        li.appendChild(textSpan);
        li.appendChild(deleteBtn);

        //gdzie leci
        if (wybranyPriorytet === 'high') {
            listHigh.appendChild(li);
        } else {
            listLow.appendChild(li);
        }

        input.value = '';
    }
});