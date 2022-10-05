import { fetchCall, endpoints, fetchOptions } from "../api.mjs";
const { entry, getWithJwt } = fetchOptions;
const { posts } = endpoints;
export const commentList = () => {
  const commentButtons = document.querySelectorAll(".comment-button");
  commentButtons.forEach((btn) => {
    btn.addEventListener(
      "click",
      () => {
        const commentSection = document.getElementById(
          btn.dataset.commentButton
        );
        commentSection.classList.toggle("collapse");
        commentSection.innerHTML = "";
        const commentForm = document.createElement("form");
        commentForm.setAttribute("id", "comment-form");
        const commentInput = document.createElement("textarea");
        commentInput.setAttribute("id", "comment-input");
        commentInput.classList.add("form-control");
        commentInput.onchange = true;
        commentInput.placeholder = "Write a comment";
        const commentFormButton = document.createElement("button");
        commentFormButton.setAttribute("type", "submit");
        commentFormButton.classList.add("btn");
        commentFormButton.classList.add("btn-grey-ish");
        commentFormButton.classList.add("mb-2");
        commentFormButton.classList.add("p-1");
        commentFormButton.innerText = "submit";
        //insert the created elements into the form
        commentForm.insertAdjacentElement("afterbegin", commentInput);
        commentForm.insertAdjacentElement("beforeend", commentFormButton);
        //insert the form into the commentsection
        commentSection.insertAdjacentElement("afterbegin", commentForm);
        commentForm.addEventListener("submit", (e) => {
          e.preventDefault();
          entry.body = JSON.stringify({
            body: commentInput.value,
          });
          fetchCall(`posts/${btn.dataset.commentButton}/comment`, entry).then(
            (data) => {
              console.log(data);
            }
          );
          setTimeout(() => {
            commentForm.reset();
            commentSection.innerHTML = "";
            commentSection.insertAdjacentElement("afterbegin", commentForm);
            displayComments(btn.dataset.commentButton, commentSection);
            let commentCounter = document.querySelector(
              `#comment-counter${btn.dataset.commentButton}`
            );
            // the next three lines will add 1 to the commentcounter
            const commentCounterValue = Number(commentCounter.textContent);
            const newCounterValue = commentCounterValue + 1;
            commentCounter.textContent = newCounterValue;
          }, 500);
        });
        displayComments(btn.dataset.commentButton, commentSection);
      }
      // { once: true }
    );
  });
};

const displayComments = (id, relevantComment) => {
  fetchCall(
    posts + id + "?_author=true&_comments=true&_reactions=true",
    getWithJwt
  ).then((data) => {
    data.comments.forEach((data) => {
      const commentDiv = document.createElement("div");
      commentDiv.insertAdjacentHTML(
        "beforeend",
        `
  <div class="card">
        <div class="card-header" data->
            ${data.owner}
        </div>
        <div class="card-body">
        <blockquote class="blockquote mb-0">
                <p class="comment-body">${data.body}</p>
        </blockquote>
        </div>
        </div>
  `
      );
      relevantComment.insertAdjacentElement("beforeend", commentDiv);
    });
  });
};
