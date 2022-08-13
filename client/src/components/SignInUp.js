import React, { useState, useContext } from "react";
import "../Styles/signInUp.css";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../App";

const SignInUp = (props) => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const postData = (type) => {
    if (type == "signup") {
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        return alert("Invalid Email!");
      }
      fetch("/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
          email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert(data.message);
            setUserName("");
            setEmail("");
            setPassword("");
            navigate("/login");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      fetch("/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            alert(data.error);
          } else {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({ type: "USER", payload: data.user });
            alert("Signed in successfully");
            navigate("/");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className="signInUp-body body">
      <div className="box">
        <div className="left">
          <svg
            className="circle"
            width="168"
            height="335"
            viewBox="0 0 335 335"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M275 137.5C275 213.439 213.439 275 137.5 275C61.5608 275 0 213.439 0 137.5C0 61.5608 61.5608 0 137.5 0C213.439 0 275 61.5608 275 137.5ZM11.9576 137.5C11.9576 206.835 68.1648 263.042 137.5 263.042C206.835 263.042 263.042 206.835 263.042 137.5C263.042 68.1648 206.835 11.9576 137.5 11.9576C68.1648 11.9576 11.9576 68.1648 11.9576 137.5Z"
              fill="black"
              fill-opacity="0.1"
            />
          </svg>
          <svg
            className="circle"
            width="168"
            height="335"
            viewBox="0 0 335 335"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M335 167.5C335 260.008 260.008 335 167.5 335C74.9923 335 0 260.008 0 167.5C0 74.9923 74.9923 0 167.5 0C260.008 0 335 74.9923 335 167.5ZM19.2276 167.5C19.2276 249.389 85.6114 315.772 167.5 315.772C249.389 315.772 315.772 249.389 315.772 167.5C315.772 85.6114 249.389 19.2276 167.5 19.2276C85.6114 19.2276 19.2276 85.6114 19.2276 167.5Z"
              fill="black"
              fill-opacity="0.1"
            />
          </svg>
          <svg
            className="circle"
            width="168"
            height="335"
            viewBox="0 0 335 335"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M335 167.5C335 260.008 260.008 335 167.5 335C74.9923 335 0 260.008 0 167.5C0 74.9923 74.9923 0 167.5 0C260.008 0 335 74.9923 335 167.5ZM19.2276 167.5C19.2276 249.389 85.6114 315.772 167.5 315.772C249.389 315.772 315.772 249.389 315.772 167.5C315.772 85.6114 249.389 19.2276 167.5 19.2276C85.6114 19.2276 19.2276 85.6114 19.2276 167.5Z"
              fill="black"
              fill-opacity="0.1"
            />
          </svg>
          <svg
            className="circle"
            width="168"
            height="335"
            viewBox="0 0 335 335"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M275 137.5C275 213.439 213.439 275 137.5 275C61.5608 275 0 213.439 0 137.5C0 61.5608 61.5608 0 137.5 0C213.439 0 275 61.5608 275 137.5ZM11.9576 137.5C11.9576 206.835 68.1648 263.042 137.5 263.042C206.835 263.042 263.042 206.835 263.042 137.5C263.042 68.1648 206.835 11.9576 137.5 11.9576C68.1648 11.9576 11.9576 68.1648 11.9576 137.5Z"
              fill="black"
              fill-opacity="0.1"
            />
          </svg>

          <svg
            className="girl"
            width="544"
            height="634"
            viewBox="0 0 544 634"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M399.72 471H219.833C216.961 470.997 214.207 469.855 212.176 467.824C210.146 465.793 209.003 463.04 209 460.168V330.833C209.003 327.961 210.146 325.207 212.176 323.176C214.207 321.146 216.961 320.003 219.833 320H399.72C402.592 320.003 405.345 321.146 407.376 323.176C409.407 325.207 410.549 327.961 410.553 330.833V460.168C410.549 463.04 409.407 465.793 407.376 467.824C405.345 469.855 402.592 470.997 399.72 471V471Z"
              fill="#E6E6E6"
            />
            <path
              d="M223.158 462.365H396.395C397.788 462.365 399.124 461.812 400.109 460.827C401.094 459.842 401.647 458.506 401.647 457.113V333.887C401.647 332.494 401.094 331.158 400.109 330.173C399.124 329.188 397.788 328.635 396.395 328.635H223.158C221.765 328.635 220.429 329.188 219.444 330.173C218.459 331.158 217.906 332.494 217.906 333.887V457.113C217.906 458.506 218.459 459.842 219.444 460.827C220.429 461.812 221.765 462.365 223.158 462.365Z"
              fill="white"
            />
            <path
              d="M375.745 366.924H265.088C264.569 366.924 264.055 367.026 263.575 367.225C263.096 367.423 262.66 367.714 262.293 368.081C261.926 368.448 261.635 368.884 261.436 369.363C261.238 369.843 261.136 370.357 261.136 370.876C261.136 371.395 261.238 371.909 261.436 372.388C261.635 372.868 261.926 373.303 262.293 373.67C262.66 374.037 263.096 374.328 263.575 374.527C264.055 374.726 264.569 374.828 265.088 374.828H375.745C376.793 374.828 377.798 374.411 378.54 373.67C379.281 372.929 379.697 371.924 379.697 370.876C379.697 369.828 379.281 368.822 378.54 368.081C377.798 367.34 376.793 366.924 375.745 366.924V366.924Z"
              fill="#E6E6E6"
            />
            <path
              d="M265.088 391.244C264.569 391.244 264.055 391.346 263.575 391.545C263.096 391.743 262.66 392.035 262.293 392.402C261.926 392.769 261.635 393.204 261.436 393.684C261.238 394.163 261.136 394.677 261.136 395.196C261.136 395.715 261.238 396.229 261.436 396.708C261.635 397.188 261.926 397.624 262.293 397.991C262.66 398.358 263.096 398.649 263.575 398.847C264.055 399.046 264.569 399.148 265.088 399.148H375.745C376.793 399.148 377.798 398.732 378.54 397.991C379.281 397.249 379.697 396.244 379.697 395.196C379.697 394.148 379.281 393.143 378.54 392.402C377.798 391.66 376.793 391.244 375.745 391.244H265.088Z"
              fill="#E6E6E6"
            />
            <path
              d="M265.088 415.564C264.04 415.564 263.034 415.981 262.293 416.722C261.552 417.463 261.136 418.468 261.136 419.516C261.136 420.565 261.552 421.57 262.293 422.311C263.034 423.052 264.04 423.469 265.088 423.469H375.745C376.793 423.469 377.798 423.052 378.54 422.311C379.281 421.57 379.697 420.565 379.697 419.516C379.697 418.468 379.281 417.463 378.54 416.722C377.798 415.981 376.793 415.564 375.745 415.564H265.088Z"
              fill="#E6E6E6"
            />
            <path
              d="M244.111 376.044C246.798 376.044 248.976 373.866 248.976 371.18C248.976 368.493 246.798 366.316 244.111 366.316C241.425 366.316 239.247 368.493 239.247 371.18C239.247 373.866 241.425 376.044 244.111 376.044Z"
              fill="#6C63FF"
            />
            <path
              d="M244.111 400.364C246.798 400.364 248.976 398.186 248.976 395.5C248.976 392.814 246.798 390.636 244.111 390.636C241.425 390.636 239.247 392.814 239.247 395.5C239.247 398.186 241.425 400.364 244.111 400.364Z"
              fill="#E6E6E6"
            />
            <path
              d="M244.111 424.684C246.798 424.684 248.976 422.507 248.976 419.82C248.976 417.134 246.798 414.956 244.111 414.956C241.425 414.956 239.247 417.134 239.247 419.82C239.247 422.507 241.425 424.684 244.111 424.684Z"
              fill="#E6E6E6"
            />
            <path
              d="M331.665 370.876C331.665 371.395 331.562 371.909 331.364 372.388C331.165 372.868 330.874 373.303 330.507 373.67C330.14 374.037 329.704 374.328 329.225 374.527C328.745 374.726 328.232 374.828 327.713 374.828H265.23C264.254 374.842 263.305 374.503 262.559 373.874C261.813 373.244 261.32 372.366 261.17 371.401C261.096 370.843 261.142 370.275 261.305 369.736C261.469 369.197 261.745 368.699 262.115 368.276C262.486 367.852 262.943 367.512 263.456 367.279C263.968 367.046 264.525 366.925 265.088 366.924H327.713C328.761 366.924 329.766 367.34 330.507 368.081C331.248 368.822 331.665 369.828 331.665 370.876V370.876Z"
              fill="#6C63FF"
            />
            <path
              d="M331.171 242.145H136.71C133.606 242.142 130.629 240.907 128.434 238.711C126.238 236.516 125.004 233.539 125 230.435V90.622C125.004 87.5173 126.238 84.5408 128.434 82.3455C130.629 80.1501 133.606 78.9152 136.71 78.9117H331.171C334.275 78.9153 337.252 80.1501 339.447 82.3455C341.643 84.5408 342.877 87.5173 342.881 90.622V230.435C342.877 233.539 341.643 236.516 339.447 238.711C337.252 240.907 334.275 242.142 331.171 242.145V242.145Z"
              fill="#E6E6E6"
            />
            <path
              d="M140.305 232.81H327.576C329.082 232.81 330.526 232.212 331.591 231.147C332.656 230.082 333.254 228.638 333.254 227.132V93.9239C333.254 92.4181 332.656 90.9739 331.591 89.9092C330.526 88.8444 329.082 88.2462 327.576 88.2462H140.305C138.799 88.2462 137.355 88.8444 136.29 89.9092C135.225 90.9739 134.627 92.4181 134.627 93.9239V227.132C134.627 228.638 135.225 230.082 136.29 231.147C137.355 232.212 138.799 232.81 140.305 232.81Z"
              fill="white"
            />
            <path
              d="M154.148 156.469C153.025 156.469 151.949 156.915 151.155 157.709C150.361 158.503 149.914 159.58 149.914 160.703C149.914 161.826 150.361 162.903 151.155 163.697C151.949 164.491 153.025 164.937 154.148 164.937H313.733C314.856 164.937 315.932 164.491 316.726 163.697C317.52 162.903 317.967 161.826 317.967 160.703C317.967 159.58 317.52 158.503 316.726 157.709C315.932 156.915 314.856 156.469 313.733 156.469H154.148Z"
              fill="#E6E6E6"
            />
            <path
              d="M154.148 182.523C153.025 182.523 151.949 182.969 151.155 183.763C150.361 184.557 149.914 185.634 149.914 186.757C149.914 187.88 150.361 188.957 151.155 189.751C151.949 190.545 153.025 190.991 154.148 190.991H313.733C314.856 190.991 315.932 190.545 316.726 189.751C317.52 188.957 317.967 187.88 317.967 186.757C317.967 185.634 317.52 184.557 316.726 183.763C315.932 182.969 314.856 182.523 313.733 182.523H154.148Z"
              fill="#E6E6E6"
            />
            <path
              d="M225.473 209.881C224.35 209.881 223.273 210.327 222.479 211.121C221.685 211.915 221.239 212.992 221.239 214.115C221.239 215.238 221.685 216.314 222.479 217.108C223.273 217.902 224.35 218.348 225.473 218.348H242.408C243.531 218.348 244.608 217.902 245.402 217.108C246.196 216.314 246.642 215.238 246.642 214.115C246.642 212.992 246.196 211.915 245.402 211.121C244.608 210.327 243.531 209.881 242.408 209.881H225.473Z"
              fill="#6C63FF"
            />
            <path
              d="M211.247 102.708C210.902 102.708 210.57 102.846 210.326 103.09C210.082 103.334 209.945 103.665 209.944 104.011V137.081C209.945 137.426 210.082 137.757 210.326 138.001C210.57 138.246 210.902 138.383 211.247 138.383H256.634C256.979 138.383 257.31 138.246 257.555 138.001C257.799 137.757 257.936 137.426 257.937 137.081V104.011C257.936 103.665 257.799 103.334 257.555 103.09C257.31 102.846 256.979 102.708 256.634 102.708L211.247 102.708Z"
              fill="#6C63FF"
            />
            <path
              d="M233.941 124.053C237.898 124.053 241.106 120.845 241.106 116.888C241.106 112.931 237.898 109.723 233.941 109.723C229.983 109.723 226.776 112.931 226.776 116.888C226.776 120.845 229.983 124.053 233.941 124.053Z"
              fill="white"
            />
            <path
              d="M245.665 135.126C245.668 136.259 245.4 137.375 244.883 138.383H222.998C222.44 137.291 222.172 136.074 222.219 134.848C222.267 133.622 222.628 132.43 223.269 131.384C223.91 130.338 224.808 129.474 225.878 128.875C226.948 128.275 228.154 127.961 229.381 127.961H238.5C240.399 127.96 242.221 128.714 243.565 130.056C244.908 131.398 245.664 133.219 245.665 135.118V135.126Z"
              fill="white"
            />
            <path
              d="M233.941 124.053C237.898 124.053 241.106 120.845 241.106 116.888C241.106 112.931 237.898 109.723 233.941 109.723C229.983 109.723 226.776 112.931 226.776 116.888C226.776 120.845 229.983 124.053 233.941 124.053Z"
              fill="white"
            />
            <path
              d="M245.665 135.126C245.668 136.259 245.4 137.375 244.883 138.383H222.998C222.44 137.291 222.172 136.074 222.219 134.848C222.267 133.622 222.628 132.43 223.269 131.384C223.91 130.338 224.808 129.474 225.878 128.875C226.948 128.275 228.154 127.961 229.381 127.961H238.5C240.399 127.96 242.221 128.714 243.565 130.056C244.908 131.398 245.664 133.219 245.665 135.118V135.126Z"
              fill="white"
            />
            <path
              d="M233.94 60.8709C243.294 60.8709 250.876 53.2887 250.876 43.9355C250.876 34.5823 243.294 27 233.94 27C224.587 27 217.005 34.5823 217.005 43.9355C217.005 53.2887 224.587 60.8709 233.94 60.8709Z"
              fill="#2B20DC"
            />
            <path
              d="M233.941 52.4031C238.617 52.4031 242.408 48.612 242.408 43.9354C242.408 39.2588 238.617 35.4677 233.941 35.4677C229.264 35.4677 225.473 39.2588 225.473 43.9354C225.473 48.612 229.264 52.4031 233.941 52.4031Z"
              fill="#6C63FF"
            />
            <path
              d="M371.766 104.336C371.815 105.664 372.154 106.965 372.76 108.147C373.366 109.329 374.224 110.364 375.274 111.179C376.323 111.994 377.539 112.569 378.834 112.863C380.13 113.158 381.474 113.165 382.773 112.883L399.583 140.461L406.738 125.279L389.678 101.418C389.06 99.2678 387.676 97.4189 385.786 96.2215C383.897 95.0241 381.633 94.5614 379.426 94.921C377.218 95.2807 375.218 96.4378 373.807 98.173C372.395 99.9082 371.669 102.101 371.766 104.336H371.766Z"
              fill="#FFB6B6"
            />
            <path
              d="M497.918 183.372L439.985 151.949L421.712 134.805C421.712 134.805 413.768 132.678 416.692 130.095C419.616 127.512 411.284 125.021 411.284 125.021L401.475 115.818L387.536 125.68L391.57 131.934C391.57 131.934 391.292 142.286 396.963 140.294C402.634 138.303 401.217 146.888 401.217 146.888L435.067 199.36L497.918 183.372Z"
              fill="#3F3D56"
            />
            <path
              d="M498.097 595.533H486.331L480.732 550.151H498.097V595.533Z"
              fill="#FFB6B6"
            />
            <path
              d="M504.307 615.918H495.87L494.363 607.952L490.506 615.918H468.127C467.055 615.918 466.01 615.575 465.146 614.94C464.282 614.304 463.644 613.409 463.325 612.385C463.005 611.361 463.022 610.261 463.372 609.247C463.721 608.233 464.386 607.358 465.269 606.748L483.14 594.406V586.352L501.937 587.474L504.307 615.918Z"
              fill="#2F2E41"
            />
            <path
              d="M403.995 595.533H392.229L386.63 550.151H403.995V595.533Z"
              fill="#FFB6B6"
            />
            <path
              d="M410.205 615.918H401.767L400.261 607.952L396.404 615.918H374.025C372.953 615.918 371.908 615.575 371.044 614.94C370.18 614.304 369.542 613.409 369.222 612.385C368.903 611.361 368.92 610.261 369.269 609.247C369.619 608.233 370.284 607.358 371.167 606.748L389.038 594.406V586.352L407.835 587.474L410.205 615.918Z"
              fill="#2F2E41"
            />
            <path
              d="M485.613 252.313H426.228V319.92H485.613V252.313Z"
              fill="#FFB6B6"
            />
            <path
              d="M427.598 285.66L417.549 297.537L400.19 334.081L356.451 438.151L347.2 460.16L354.671 499.067C354.671 499.067 355.88 526.478 355.88 530.965C355.88 540.101 363.521 545.163 363.521 545.163L369.127 574.361L423.487 572.077C423.487 572.077 421.59 539.893 410.205 531.774C398.82 523.656 393.586 481.346 393.586 481.346L387.399 462.573L447.698 391.096L448.087 416.081L448.275 428.174C448.275 428.174 439.445 506.83 449.738 522.095C460.032 537.36 449.948 535.564 449.948 535.564L450.439 567.052L514.848 567.509L500.639 476.854C500.639 476.854 493.423 471.156 497.284 465.43C501.144 459.703 493.542 452.689 493.542 452.689L496.952 381.917C496.952 381.917 493.177 369.692 497.617 368.103C502.058 366.514 498.2 356.002 498.2 356.002L498.86 342.304L485.613 299.821L427.598 285.66Z"
              fill="#2F2E41"
            />
            <path
              d="M486.526 252.313L492.922 233.127L497.49 226.732L499.317 208.459C499.317 159.124 488.312 167.34 488.312 167.34L481.958 149.988L452.723 149.074L433.994 166.89L418.462 172.372L412.38 203.974L423.487 237.695L426.228 255.967C421 265.619 421.442 261.054 425.771 268.301L477.39 282.462C495.663 288.857 495.663 272.412 491.999 268.301C488.335 264.19 486.526 252.313 486.526 252.313Z"
              fill="#3F3D56"
            />
            <path
              d="M463.564 142.942C478.532 142.942 490.666 130.807 490.666 115.839C490.666 100.871 478.532 88.7367 463.564 88.7367C448.596 88.7367 436.461 100.871 436.461 115.839C436.461 130.807 448.596 142.942 463.564 142.942Z"
              fill="#FFB6B6"
            />
            <path
              d="M499.746 152.016C500.002 152.447 500.156 152.93 500.199 153.429C500.242 153.928 500.172 154.43 499.993 154.898C499.815 155.366 499.534 155.788 499.17 156.132C498.806 156.476 498.369 156.734 497.892 156.886C494.256 158.092 492.017 161.609 489.404 164.423C486.8 167.228 482.607 169.558 479.281 167.648C475.965 165.748 475.737 160.897 472.959 158.265C470.255 155.707 465.76 156.018 462.581 157.964L462.486 158.022C461.937 158.38 461.295 158.569 460.64 158.566C459.985 158.563 459.345 158.368 458.799 158.006C458.254 157.643 457.827 157.128 457.571 156.525C457.314 155.922 457.241 155.257 457.358 154.613C458.472 148.688 459.586 142.764 460.699 136.841C457.774 143.886 453.529 150.305 448.191 155.753C446.721 157.45 444.858 158.761 442.764 159.572C440.864 160.175 439.018 158.211 437.173 158.567C441.759 154.556 457.181 128.847 454.422 111.662C451.179 112.027 447.935 112.393 444.692 112.758C444.341 111.223 443.591 109.808 442.518 108.656C442.649 110.15 442.459 111.655 441.96 113.069C440.608 113.224 439.247 113.37 437.895 113.526C436.013 113.736 433.966 113.919 432.349 112.932C429.654 111.287 429.572 107.395 430.339 104.326C432.587 95.3997 439.402 87.9354 447.743 84.0252C456.085 80.1241 458.551 88.8125 467.34 86.0352C484.699 80.5535 498.001 89.9272 502.688 107.322C506.626 121.913 503.766 137.398 499.746 152.016Z"
              fill="#2F2E41"
            />
            <path
              d="M321.764 173.341L287.076 144.047C285.89 143.044 285.151 141.611 285.021 140.063C284.89 138.515 285.379 136.979 286.38 135.791L292.764 128.231C293.768 127.045 295.201 126.306 296.749 126.175C298.297 126.045 299.833 126.534 301.021 127.534L335.709 156.828C336.895 157.832 337.634 159.265 337.764 160.813C337.895 162.36 337.406 163.897 336.405 165.085L330.021 172.645C329.017 173.831 327.584 174.57 326.036 174.7C324.488 174.831 322.952 174.342 321.764 173.341V173.341Z"
              fill="#3F3D56"
            />
            <path
              d="M288.896 136.4C288.357 137.04 288.094 137.868 288.164 138.702C288.234 139.536 288.632 140.309 289.271 140.849L323.959 170.143C324.6 170.683 325.427 170.946 326.262 170.876C327.096 170.805 327.868 170.407 328.409 169.768L334.793 162.208C335.332 161.568 335.596 160.74 335.526 159.906C335.455 159.072 335.057 158.3 334.418 157.759L299.73 128.465C299.09 127.926 298.262 127.662 297.428 127.733C296.594 127.803 295.821 128.201 295.281 128.84L288.896 136.4Z"
              fill="white"
            />
            <path
              d="M309.26 147.788C309.14 147.956 308.982 148.094 308.799 148.191C308.616 148.288 308.413 148.341 308.206 148.346L302.756 148.471C302.581 148.475 302.406 148.444 302.243 148.381C302.08 148.318 301.931 148.223 301.804 148.102C301.677 147.981 301.576 147.836 301.505 147.676C301.434 147.516 301.396 147.343 301.392 147.168C301.388 146.993 301.418 146.819 301.482 146.655C301.545 146.492 301.64 146.343 301.761 146.216C301.882 146.09 302.026 145.988 302.187 145.917C302.347 145.847 302.519 145.808 302.695 145.804L306.26 145.722L302.749 136.457C302.624 136.126 302.636 135.76 302.782 135.438C302.927 135.116 303.194 134.865 303.524 134.74C303.855 134.615 304.221 134.626 304.543 134.77C304.865 134.915 305.117 135.181 305.243 135.511L309.423 146.54C309.498 146.739 309.525 146.954 309.5 147.166C309.476 147.378 309.401 147.58 309.282 147.757L309.26 147.788Z"
              fill="#6C63FF"
            />
            <path
              d="M309.959 150.116C311.274 150.309 312.53 150.788 313.64 151.519C314.749 152.251 315.685 153.216 316.381 154.348C317.077 155.48 317.516 156.75 317.668 158.07C317.82 159.39 317.68 160.728 317.259 161.988L342.845 181.697L326.975 187.159L305.111 167.605C303.041 166.757 301.353 165.18 300.369 163.171C299.384 161.163 299.17 158.863 299.767 156.707C300.365 154.551 301.733 152.69 303.611 151.475C305.49 150.26 307.748 149.777 309.959 150.116L309.959 150.116Z"
              fill="#FFB6B6"
            />
            <path
              d="M443.168 159.862L377.659 200.139C377.659 200.139 351.246 190.367 356.408 185.843C361.57 181.318 345.137 178.26 345.137 178.26L326.984 166.047L316.45 178.289C316.45 178.289 318.369 198.174 321.635 194.731C324.901 191.288 329.782 200.694 329.782 200.694C329.782 200.694 331.225 211.196 340.521 208.553C349.818 205.91 374.764 233.614 374.764 233.614L455.386 203.545L443.168 159.862Z"
              fill="#3F3D56"
            />
            <path
              d="M118.586 399.172C149.838 399.172 175.172 373.838 175.172 342.586C175.172 311.334 149.838 286 118.586 286C87.3344 286 62 311.334 62 342.586C62 373.838 87.3344 399.172 118.586 399.172Z"
              fill="#2B20DC"
            />
            <path
              d="M116.596 365.285C115.837 365.285 115.088 365.108 114.408 364.768C113.729 364.429 113.138 363.936 112.683 363.328L100.685 347.33C100.3 346.816 100.019 346.232 99.8597 345.609C99.7003 344.987 99.665 344.339 99.7559 343.703C99.8468 343.067 100.062 342.456 100.389 341.903C100.717 341.35 101.15 340.867 101.664 340.482C102.702 339.703 104.006 339.369 105.291 339.553C105.926 339.644 106.538 339.859 107.091 340.186C107.644 340.513 108.127 340.946 108.512 341.46L116.362 351.926L136.522 321.686C137.242 320.606 138.361 319.857 139.633 319.602C140.905 319.348 142.226 319.609 143.306 320.329C144.386 321.048 145.135 322.167 145.389 323.44C145.644 324.712 145.382 326.033 144.663 327.113L120.667 363.107C120.233 363.758 119.649 364.295 118.964 364.674C118.28 365.052 117.514 365.262 116.732 365.284C116.687 365.284 116.642 365.285 116.596 365.285Z"
              fill="white"
            />
          </svg>
          <p>WELCOME TO TECHIT</p>
        </div>
        <div className="right">
          <div className="top-buttons">
            <Link className="link" to={state ? "/" : "/login"}>
              <button>Home</button>
            </Link>
            <button>{props.option}</button>
          </div>
          <div className="right-container">
            <h2>{props.title}</h2>
            <div className="field">
              <p>Username</p>
              <input
                type="text"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div
              className="field"
              style={
                props.type == "signin"
                  ? { display: "none" }
                  : { display: "block" }
              }
            >
              <p>Email address</p>
              <input
                type="text"
                placeholder="Example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <p>Password</p>
              <input
                type="text"
                // type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={() => postData(props.type)}>{props.button}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInUp;

/* <div className="">
</div>; */
