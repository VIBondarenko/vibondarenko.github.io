const codeContainer = document.querySelector('.code-container');
const codeLines = [
    '<span class="annotation">@RestController</span>',
    '<span class="annotation">@RequestMapping</span>(<span class="string">"/contact"</span>)',
    '<span class="keyword">public class</span> <span class="type">VBOCardController</span> {',
    '',
    '    <span class="annotation">@GetMapping</span>',
    '    <span class="keyword">public</span> <span class="type">ContactInfo</span> <span class="method">getCard</span>() {',
    '        <span class="keyword">return new</span> <span class="type">ContactInfo</span>(',
    '            <span class="string">"Vitaliy Bondarenko"</span>,',
    '            <span class="string">"vibondarenko@gmail.com"</span>,',
    '        )<span class="semicolon">;</span>',
    '    }',
    '',
    '    <span class="keyword">record</span> <span class="type">ContactInfo</span>(',
    '        <span class="type">String</span> <span class="variable">name</span>,',
    '        <span class="type">String</span> <span class="variable">email</span>,',
    '    ) {}',
    '}'
];

const typingSpeed = 30;
const fullCodeHTML = codeLines.join('<br>');

function startAnimation() {
    let i = 0;
    let currentHtml = '';

    function animateTyping() {
        if (i < fullCodeHTML.length) {
            currentHtml += fullCodeHTML[i];
            codeContainer.innerHTML = currentHtml + '<span class="cursor"></span>';
            
            // Автоматическая прокрутка
            codeContainer.scrollTop = codeContainer.scrollHeight;

            i++;
            setTimeout(animateTyping, typingSpeed);
        } else {
            // Удаляем курсор после завершения
            const finalCursor = codeContainer.querySelector('.cursor');
            if (finalCursor) {
                finalCursor.remove();
            }

            // Пауза и перезапуск анимации
            setTimeout(() => {
                codeContainer.innerHTML = ''; // Очищаем содержимое
                startAnimation(); // Начинаем заново
            }, 2000); // Пауза в 2 секунды
        }
    }
    animateTyping();
}

document.addEventListener('DOMContentLoaded', startAnimation);