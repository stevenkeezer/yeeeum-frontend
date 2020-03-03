import React from "react";
import "./util.css";
import "./ComingSoon.css";
import Background from "../../../assets/img/bowls.jpg";
import Logo from "../../../assets/img/logo.png";

export default function ComingSoon() {
  return (
    <main className="main">
      <div class="size1 bg0 where1-parent">
        <div
          class="flex-c-m bg-img1 size2 where1 overlay1 where2 respon2"
          style={{
            backgroundImage: `url(${Background})`
          }}
        >
          <div class="wsize2 flex-w flex-c-m cd100 js-tilt">
            {/* <div class="flex-col-c-m size6 bor2 m-l-10 m-r-10 m-t-15">
              <span class="l2-txt1 p-b-9 days">35</span>
              <span class="s2-txt4">Days</span>
            </div>

            <div class="flex-col-c-m size6 bor2 m-l-10 m-r-10 m-t-15">
              <span class="l2-txt1 p-b-9 hours">17</span>
              <span class="s2-txt4">Hours</span>
            </div>

            <div class="flex-col-c-m size6 bor2 m-l-10 m-r-10 m-t-15">
              <span class="l2-txt1 p-b-9 minutes">50</span>
              <span class="s2-txt4">Minutes</span>
            </div>

            <div class="flex-col-c-m size6 bor2 m-l-10 m-r-10 m-t-15">
              <span class="l2-txt1 p-b-9 seconds">39</span>
              <span class="s2-txt4">Seconds</span>
            </div> */}
          </div>
        </div>

        <div class="size3 flex-col-sb flex-w p-l-75 p-r-75 p-t-45 p-b-45 respon1">
          <div class="wrap-pic1">
            <div className="row">
              <img src={Logo} style={{ width: "60px" }} alt="LOGO" />
              <h3 className="pl-1 header-title">Shop</h3>
            </div>
          </div>

          <div class="p-t-50 p-b-60">
            <p class="m1-txt1 p-b-36">
              This feature is{" "}
              <span class="m1-txt2" style={{ fontWeight: "bold" }}>
                Coming Soon
              </span>
              , follow us for an update now!
            </p>

            <form class="contact100-form validate-form">
              <div
                class="wrap-input100 m-b-10 validate-input"
                data-validate="Name is required"
              >
                <input
                  class="s2-txt1 placeholder0 input100"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                />
                <span class="focus-input100"></span>
              </div>

              <div
                class="wrap-input100 m-b-20 validate-input"
                data-validate="Email is required: ex@abc.xyz"
              >
                <input
                  class="s2-txt1 placeholder0 input100"
                  type="text"
                  name="email"
                  placeholder="Email Address"
                />
                <span class="focus-input100"></span>
              </div>

              <div class="w-full">
                <button class="flex-c-m s2-txt2 size4 bg1 bor1 hov1 trans-04">
                  Subscribe
                </button>
              </div>
            </form>

            <p class="s2-txt3 p-t-18">
              And don’t worry, we hate spam too! You can unsubcribe at anytime.
            </p>
          </div>

          <div class="flex-w">
            <a href="#" class="flex-c-m size5 bg3 how1 trans-04 m-r-5">
              <i class="fa fa-facebook"></i>
            </a>

            <a href="#" class="flex-c-m size5 bg4 how1 trans-04 m-r-5">
              <i class="fa fa-twitter"></i>
            </a>

            <a href="#" class="flex-c-m size5 bg5 how1 trans-04 m-r-5">
              <i class="fa fa-youtube-play"></i>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
