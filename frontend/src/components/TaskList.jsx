import { useEffect, useRef } from 'react';
import TaskItem from './TaskItem.jsx';
import '../styles/TaskList.css';

const TaskList = ({ tasks, resetKey, onEdit, onDelete, onToggle }) => {
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const indexRef = useRef(1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || tasks.length <= 1) return;

    const slides = Array.from(track.children);
    const positionSlides = () => {
      const w = slides[0].getBoundingClientRect().width;
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.left = w * i + 'px';
      }
    };

    positionSlides();

    indexRef.current = 1;
    track.style.transition = 'none';
    track.style.transform = 'translateX(-' + slides[1].style.left + ')';

    const goToSlide = (i) => {
      track.style.transition = 'transform 0.6s ease-in-out';
      track.style.transform = 'translateX(-' + slides[i].style.left + ')';
    };

    const nextSlide = () => {
      indexRef.current++;

      if (indexRef.current >= slides.length) {
        indexRef.current = slides.length - 1;
      }

      goToSlide(indexRef.current);

      if (indexRef.current === slides.length - 1) {
        setTimeout(function () {
          indexRef.current = 1;
          track.style.transition = 'none';
          track.style.transform = 'translateX(-' + slides[1].style.left + ')';
        }, 620);
      }
    };

    const startAutoplay = () => {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(nextSlide, 5000);
    };

    const stopAutoplay = () => {
      clearInterval(timerRef.current);
    };

    startAutoplay();

    var carousel = track.closest('.carousel');
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    track.addEventListener('touchstart', stopAutoplay);

    const onResize = () => {
      stopAutoplay();
      positionSlides();
      track.style.transition = 'none';
      track.style.transform = 'translateX(-' + slides[indexRef.current].style.left + ')';
      startAutoplay();
    };  
    window.addEventListener('resize', onResize);

    return () => {
      stopAutoplay();
      window.removeEventListener('resize', onResize);
      carousel.removeEventListener('mouseenter', stopAutoplay);
      carousel.removeEventListener('mouseleave', startAutoplay);
      track.removeEventListener('touchstart', stopAutoplay);
    };
  }, [resetKey]);

  if (tasks.length === 0) {
    return <div className="carousel-empty">No tasks yet, you can add one above.</div>;
  }

  if (tasks.length === 1) {
    return (
      <div className="carousel single">
        <div className="carousel__track-container">
          <div className="carousel-slide">
            <TaskItem task={tasks[0]} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
          </div>
        </div>
      </div>
    );
  };

  let slidesToRender = [tasks[tasks.length - 1], ...tasks, tasks[0]];

  return (
    <div className="carousel">
      <p className="carousel-tip">Hover over a task to pause the carousel</p>
      <div className="carousel__track-container">
        <div className="carousel-track" ref={trackRef}>
          {slidesToRender.map((task, i) => {
            return (
              <div className="carousel-slide" key={'slide-' + i}>
                <TaskItem task={task} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};    

export default TaskList;
