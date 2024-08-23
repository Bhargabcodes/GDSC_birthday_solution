document.addEventListener("DOMContentLoaded", function () {
  const coverPage = document.querySelector(".page.cover");
  const formPage = document.querySelector(".page.form-page");
  let currentPage = 0;

 // Load the page-turn sound
 const pageTurnSound = new Audio('page-flip2-178323.mp3'); // Ensure this path points to your audio file

 // Function to play the page-turn sound
 function playPageTurnSound() {
     pageTurnSound.currentTime = 0; // Reset sound to start
     pageTurnSound.play();
 }

  // here we show form page when clicked
  coverPage.addEventListener("click", function () {
      coverPage.style.transform = "rotateY(-180deg)";
      formPage.style.transform = "rotateY(0deg)";
      currentPage++;
      playPageTurnSound(); // Play sound when page turns
  });

  // Updating the flip animation for next pages
  function updatePageFlip() {
      const pages = document.querySelectorAll('.page');
      pages.forEach((page, index) => {
          page.style.zIndex = pages.length - index;

          if (index > 0) {
              const nextBtn = page.querySelector('.next-btn');
              const prevBtn = page.querySelector('.prev-btn');

              if (nextBtn) {
                  nextBtn.addEventListener('click', () => {
                      if (index < pages.length - 1) {
                          page.style.transform = "rotateY(-180deg)";
                          pages[index + 1].style.transform = "rotateY(0deg)";
                          currentPage++;
                      }
                  });
              }

              if (prevBtn) {
                  prevBtn.addEventListener('click', () => {
                      if (index > 0) {
                          page.style.transform = "rotateY(0deg)";
                          pages[index - 1].style.transform = "rotateY(0deg)";
                          currentPage--;
                          playPageTurnSound(); // Play sound when page turns
                      }
                  });
              }
          }
      });
  }

  // Add a new memory page
  window.addPage = function () {
      const senderName = document.getElementById('senderName').value;
      const messageText = document.getElementById('messageText').value;
      const fileInput = document.getElementById('imageUpload');
      const file = fileInput.files[0];

      // Create a new page
      const page = document.createElement('div');
      page.classList.add('page');

      // Add content to the new page
      const content = document.createElement('div');
      content.classList.add('content');

      const senderElement = document.createElement('h2');
      senderElement.textContent = senderName;
      content.appendChild(senderElement);

      const messageElement = document.createElement('p');
      messageElement.textContent = messageText;
      content.appendChild(messageElement);

      if (file) {
          const img = document.createElement('img');
          img.src = URL.createObjectURL(file);
          content.appendChild(img);
      }

      // Add buttons to the new page
      const prevButton = document.createElement('button');
      prevButton.classList.add('prev-btn');
      prevButton.textContent = 'Previous';
      content.appendChild(prevButton);

      const nextButton = document.createElement('button');
      nextButton.classList.add('next-btn');
      nextButton.textContent = 'Next';
      content.appendChild(nextButton);

      page.appendChild(content);

      // Insert the new page before the form page
      const formPage = document.querySelector('.page.form-page');
      formPage.before(page);

      // Reset the form
      document.getElementById('addMemoryForm').reset();

      // Update page flip animation
      updatePageFlip();
  }

  // Initialize the page flip
  updatePageFlip();
});
