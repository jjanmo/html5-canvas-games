import './styles.css';

const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const cardElem = e.currentTarget;
    const { left, top } = cardElem.getBoundingClientRect();
    const { clientX, clientY } = e;

    const mouseX = clientX - left;
    const mouseY = clientY - top;

    cardElem.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgb(116, 185, 255) 0%, rgba(116,185,255,0) calc(0% + 200px)  )`;
  });

  card.addEventListener('mouseout', (e) => {
    e.currentTarget.removeAttribute('style');
  });
});
