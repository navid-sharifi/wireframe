import React from "react";
import interact from "interactjs";
import parse from 'html-react-parser';

import "./css.css";
const Hub = () => {
  interact(".draggable").draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
        endOnly: true,
      }),
    ],
    autoScroll: true,

    listeners: {
      move: dragMoveListener,
      end(event) {
        var textEl = event.target.querySelector("p");
        textEl &&
          (textEl.textContent =
            "moved a distance of " +
            Math.sqrt(
              (Math.pow(event.pageX - event.x0, 2) +
                Math.pow(event.pageY - event.y0, 2)) |
                0
            ).toFixed(2) +
            "px");
      },
    },
  });

  function dragMoveListener(event) {
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.transform = "translate(" + x + "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }

  // this function is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

  return (
    <div
      style={{
        backgroundColor: "lightgreen",
        width: "700px",
        height: "800px",
        marginTop: "50px",
      }}
    >
      {parse(`
      <div id="drag-1" class="draggable">
          <p> You can drag one element </p>
        </div>
      <div id="drag-1" class="draggable">
          <p> You can drag one element </p>
        </div>
      <div id="drag-1" class="draggable">
          <p> You can drag one element </p>
        </div>
      <div id="drag-1" class="draggable">
          <p> You can drag one element </p>
        </div>
      <div id="drag-1" class="draggable">
          <p> You can drag one element </p>
        </div>
      <div id="drag-1" class="draggable">
          <p> You can drag one element </p>
        </div>
      <div id="drag-1" class="draggable">
          <p> You can drag one element </p>
        </div>
      <div id="drag-1" class="draggable">
          <p> You can drag one element </p>
        </div>
      <div id="drag-1" class="draggable">
          <p> You can drag one element </p>
        </div>
      <div id="drag-1" class="draggable">
          <p> You can drag one element </p>
        </div>
      <div id="drag-1" class="draggable">
          <p> You can drag one element </p>
        </div>
        <div id="drag-2" class="draggable">
          <p> with each pointer </p>
        </div>`)}     
    </div>
  );
};
export default Hub;
