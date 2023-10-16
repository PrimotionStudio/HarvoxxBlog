
  
const harmBurger = document.querySelector(".hamburger");
const list = document.querySelector(".list");
const times = document.querySelector(".times");

harmBurger.addEventListener("click", () => {
  list.style.right = "0";
});
times.addEventListener("click", () => {
  list.style.right = "-100%";
});
const tagContainer = document.getElementById("tag-container");
const tagInput = document.getElementById("tag-input");

// Array to store tags
const tags = [];

// Function to create and style a tag element
// function createTag(text) {
//   const tag = document.createElement("div");
//   tag.classList.add("tag");
//   tag.textContent = text;
//   return tag;
// }

// Function to create and style a tag element
function createTag(text) {
  const tag = document.createElement("div");
  tag.classList.add("tag");
  tag.textContent = text;

  // Create a remove button for each tag
  const removeButton = document.createElement("span");
  removeButton.classList.add("tag-remove");
  removeButton.textContent = "×";
  tag.appendChild(removeButton);

  return tag;
}

// Function to remove a tag when the remove button is clicked
tagContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("tag-remove")) {
    const tag = e.target.parentElement;
    const text = tag.textContent;
    tags.splice(tags.indexOf(text), 1);
    tag.remove();
  }
});

// Function to add a tag to the container
function addTag(text) {
  const tag = createTag(text);
  tags.push(text);
  tagContainer.insertBefore(tag, tagInput);
}

// Function to handle tag input
tagInput.addEventListener("keyup", function (e) {
  if (e.key === " " || e.key === "Enter" || e.key === ",") {
    const text = tagInput.value.trim();
    if (text !== "") {
      addTag(text);
      updateTagsInput(); // Update the hidden input with the tags
      tagInput.value = "";
    }
  }
});

// Function to remove a tag
// tagContainer.addEventListener("click", function (e) {
//   if (e.target.classList.contains("tag")) {
//     const text = e.target.textContent;
//     tags.splice(tags.indexOf(text), 1);
//     e.target.remove();
//   }
// });
tagContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("tag-remove")) {
    const tag = e.target.parentElement;
    const text = tag.textContent;
    tags.splice(tags.indexOf(text), 1);
    tag.remove();
    updateTagsInput(); // Update the hidden input with the tags
  }
});
function updateTagsInput() {
  const tagsInput = document.getElementById("tags-input");
  tagsInput.value = tags.join(",");
}


