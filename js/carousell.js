
document.addEventListener('DOMContentLoaded', function () {
    // Show the pop-up ad after a delay
   //setTimeout(showPopup, 3000); // Show after 3 seconds
  
    /*function showPopup() {
        document.getElementById('popup-ad-sith-files').style.display = 'block';
    }*/
  
    // Get the close button
    /*var closeButton = document.querySelector('.close-btn');*/
    
    /*closeButton.addEventListener('click', function() {
        document.getElementById('popup-ad-sith-files').style.display = 'none';
    });*/
  
    // selects all class of 'slides' and 'slider'
    const slides = document.querySelectorAll('.slide');
    const slideContainer = document.querySelector('.slider');
    
      slides.forEach((slide, index) => {
        slide.style.transition = 'none';
        slide.style.transform = `translateX(${index * 300}%)`;
      });
    
      setTimeout(() => {
        slides.forEach((slide) => {
          slide.style.transition = '';
        });
      }, 100);
    
      let currSlide = 0;
      const transitionDelay = 6000;
      const slideTransitionDuration = 1000;
      let slideInterval;
    
      function showSlide(index) {
        slides.forEach((slide, i) => {
          slide.style.transform = `translateX(${100 * (i - index)}%)`;
        });
        currSlide = index;
      }
    
      function nextSlide() {
        currSlide = (currSlide + 1) % slides.length;
        showSlide(currSlide);
      }
    
      function prevSlide() {
        currSlide = (currSlide - 1 + slides.length) % slides.length;
        showSlide(currSlide);
      }
    
      function startAutoSlide() {
        slideInterval = setInterval(nextSlide, transitionDelay);
      }
    
      function resetInterval() {
        clearInterval(slideInterval);
        startAutoSlide();
      }
    
      startAutoSlide();
    
      slides.forEach((slide, index) => {
        slide.style.transition = `transform ${slideTransitionDuration / 1000}s ease`;
        slide.style.transform = `translateX(${index * 100}%)`;
      });
  
    
      const nextButton = document.querySelector('.btn-next');
      const prevButton = document.querySelector('.btn-prev');
    
      nextButton.addEventListener('click', function() {
        clearInterval(slideInterval);
        nextSlide();
        resetInterval();
      });
    
      prevButton.addEventListener('click', function() {
        clearInterval(slideInterval);
        prevSlide();
        resetInterval();
      });
    
      const isPageRefreshed = sessionStorage.getItem('pageLoadTime');
    
      if (isPageRefreshed != slides) {
        slides.forEach(slide => {
          slide.style.transition = 'none';
        });
      }
  
  });