document.addEventListener("DOMContentLoaded", function () {
  const userName = sessionStorage.getItem("user_name");
  const userEmail = sessionStorage.getItem("user_email");
  const userPhone = sessionStorage.getItem("user_phone");

  if (!userName || !userEmail || !userPhone) {
    alert("No user data found. Please fill out the form first.");
    window.location.href = "index.html";
    return;
  }

  const designs = [
    {
      id: 1,
      name: "Modern Minimalist",
      image: "./assets/img/designs/first.jpeg",
    },
    {
      id: 2,
      name: "Corporate Professional",
      image: "./assets/img/designs/second.png",
    },
    {
      id: 3,
      name: "Creative Artistic",
      image: "./assets/img/designs/third.jpeg",
    },
    {
      id: 4,
      name: "Elegant Luxury",
      image: "./assets/img/designs/fourth.jpeg",
    },
    {
      id: 5,
      name: "Bold & Vibrant",
      image: "./assets/img/designs/fifth.png",
    },
    {
      id: 6,
      name: "Clean & Simple",
      image: "./assets/img/designs/sixth.jpeg",
    },
    {
      id: 7,
      name: "Tech Futuristic",
      image: "./assets/img/designs/seven.png",
    },
    {
      id: 8,
      name: "Nature Inspired",
      image: "./assets/img/designs/eight.jpeg",
    },
    {
      id: 9,
      name: "Vintage Classic",
      image: "./assets/img/designs/nine.jpeg",
    },
    {
      id: 10,
      name: "Abstract Geometric",
      image: "./assets/img/designs/ten.png",
    },
    {
      id: 11,
      name: "Playful Colorful",
      image: "./assets/img/designs/eleven.jpeg",
    },
    {
      id: 12,
      name: "Sophisticated Dark",
      image: "./assets/img/designs/twelve.jpeg",
    },
    {
      id: 13,
      name: "Light & Airy",
      image: "./assets/img/designs/thirteen.jpeg",
    },
    {
      id: 14,
      name: "Industrial Raw",
      image: "./assets/img/designs/fourteen.jpeg",
    },
  ];

  const designsBox = document.getElementById("designsBox");
  const selectedCount = document.getElementById("selectedCount");
  const countSpan = document.getElementById("count");
  const errorMessage = document.getElementById("errorMessage");
  const submitContainer = document.getElementById("submitContainer");
  const submitBtn = document.getElementById("submitBtn");

  let selectedDesigns = [];
  let selectedIds = new Set();

  function updateSelectionDisplay() {
    const count = selectedDesigns.length;
    countSpan.textContent = count;

    if (count > 0) {
      selectedCount.style.display = "flex";
      selectedCount.style.justifyContent = "center";
    } else {
      selectedCount.style.display = "none";
    }

    if (count === 5) {
      errorMessage.style.display = "none";
      submitContainer.style.display = "block";
      submitBtn.disabled = false;
    } else if (count > 5) {
      errorMessage.style.display = "block";
      errorMessage.textContent = `You've selected ${count} designs. Please select exactly 5.`;
      submitContainer.style.display = "none";
    } else {
      errorMessage.style.display = "none";
      submitContainer.style.display = "none";
    }
  }

  function handleDesignClick(designId, designName, checkbox) {
    checkbox.checked = !checkbox.checked;

    if (checkbox.checked) {
      if (selectedDesigns.length < 5) {
        selectedIds.add(designId);
        selectedDesigns.push({ id: designId, name: designName });
      } else {
        checkbox.checked = false;
        errorMessage.textContent =
          "You can only select 5 designs. Deselect one first.";
        errorMessage.style.display = "block";
        return;
      }
    } else {
      selectedIds.delete(designId);
      selectedDesigns = selectedDesigns.filter((d) => d.id !== designId);
    }

    const event = new Event("change", { bubbles: true });
    checkbox.dispatchEvent(event);

    updateSelectionDisplay();
  }

  designs.forEach((design) => {
    const designDiv = document.createElement("div");

    designDiv.innerHTML = `
      <input type="checkbox" id="design${design.id}" />
      <span class="design-overlay">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <p>Choose</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        <p>Selected</p>
      </span>
      <label for="design${design.id}">
        <img src="${design.image}" alt="${design.name}" />
      </label>
    `;

    designsBox.appendChild(designDiv);

    const checkbox = designDiv.querySelector(`#design${design.id}`);
    const label = designDiv.querySelector(`label[for="design${design.id}"]`);
    const image = designDiv.querySelector(
      `label[for="design${design.id}"] img`
    );

    designDiv.addEventListener("click", function (e) {
      if (e.target.tagName === "INPUT" || e.target === checkbox) {
        return;
      }
      handleDesignClick(design.id, design.name, checkbox);
    });

    if (image) {
      image.addEventListener("click", function (e) {
        e.preventDefault();
        handleDesignClick(design.id, design.name, checkbox);
      });
    }

    if (label) {
      label.addEventListener("click", function (e) {
        e.preventDefault();
        handleDesignClick(design.id, design.name, checkbox);
      });
    }

    checkbox.addEventListener("change", function (e) {
      if (
        this.checked &&
        selectedDesigns.length >= 5 &&
        !selectedIds.has(design.id)
      ) {
        this.checked = false;
        errorMessage.textContent =
          "You can only select 5 designs. Deselect one first.";
        errorMessage.style.display = "block";
      }
    });
  });

  submitBtn.addEventListener("click", async function () {
    if (selectedDesigns.length !== 5) {
      errorMessage.textContent = "Please select exactly 5 designs.";
      errorMessage.style.display = "block";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "PROCESSING...";

    const designsString = selectedDesigns.map((d) => d.name).join(", ");

    try {
      const url =
        "https://script.google.com/macros/s/AKfycbwQBRUNYc6IhaLR5hqCEeNU6oB3zYfr4pCWpCUVU8HkEJzHo57wrZGD5xwRdjCkyKT8/exec";

      const params = new URLSearchParams();
      params.append("name", userName);
      params.append("email", userEmail);
      params.append("phone", userPhone);
      params.append("designs", designsString);

      const res = await fetch(url, {
        method: "POST",
        body: params,
      });

      const data = await res.json();
      if (data.status === "success") {
        sessionStorage.clear();

        window.location.href = "thankyou.html";
      } else {
        alert("Failed to submit. Please try again.");
        submitBtn.disabled = false;
        submitBtn.textContent = "SUBMIT SELECTIONS";
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting. Please check your connection and try again.");
      submitBtn.disabled = false;
      submitBtn.textContent = "SUBMIT SELECTIONS";
    }
  });
});
