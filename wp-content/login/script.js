import { postUser, login, URLIndex } from "../../common/common.js";

$(document).ready(function () {
  //============= Phone ===============
  const phoneInput = document.getElementById("register-phone");

  phoneInput.addEventListener("input", () => {
    let phone = phoneInput.value;
    let regex = /^(0|\+84)[0-9]{9}$/;

    if (!regex.test(phone)) {
      phoneInput.setCustomValidity("Số điện thoại không hợp lệ.");
    } else {
      phoneInput.setCustomValidity("");
    }
  });

  // ================= CCCD ==============
  const cccdInput = document.getElementById("register-cccd");

  cccdInput.addEventListener("input", () => {
    const cccd = cccdInput.value;
    const regex = /^(0)[0-9]{11}$/;

    if (!regex.test(cccd)) {
      cccdInput.setCustomValidity("Vui lòng nhập chính xác CCCD của bạn.");
    } else {
      cccdInput.setCustomValidity("");
    }
  });

  // ===============  password ======================
  const passwordInput = document.getElementById("register-password");

  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!regex.test(password)) {
      passwordInput.setCustomValidity(
        "Mật khẩu của bạn phải chứa ít nhất 6 kí tự\n ít nhất một chữ số \nmột chữ thường, một chữ hoa \n và một ký tự đặc biệt. "
      );
    } else {
      passwordInput.setCustomValidity("");
    }
  });

  // =============== Change view =====================

  $("#signUp").click(function () {
    $(".sign-in-container").css("left", "-100%");
    $(".sign-up-container").css("left", "0");
  });

  $("#signIn").click(function () {
    $(".sign-in-container").css("left", "0");
    $(".sign-up-container").css("left", "-100%");
  });

  //===============  Register ===============

  /*
  "phoneNumber": "0374798126",
  "password": "thang2506",
  "fullName": "conanWinner",
  "cccd": "045204000999",
  "address": "Quảng Trị"
*/

  $("#register-form").submit(function (e) {
    e.preventDefault();
    const name = $("#register-name").val();
    const phoneNumber = $("#register-phone").val();
    const password = $("#register-password").val();
    const cccd = $("#register-cccd").val();
    const address = $("#register-address").val();

    console.log(name, phoneNumber, password, cccd, address);

    $.ajax({
      url: postUser,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ name, phoneNumber, password, cccd, address }),
      success: function (response) {
        console.log(response);
        alert("Đăng ký thành công!, vui lòng đăng nhập.");
      },
      error: function (error) {
        console.log(error);
        alert("Có lỗi xảy ra khi đăng ký!");
      },
    });
  });

  // ==============   Login  ===============
  $("#login-form").submit(function (e) {
    e.preventDefault();
    const phoneNumber = $("#login-phone").val();
    const password = $("#login-password").val();
    const whoAreYou = "user";

    $.ajax({
      url: login,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ phoneNumber, password, whoAreYou }),
      success: function (response) {
        localStorage.setItem("phoneNumber", phoneNumber);

        const data = response.result;

        console.log(JSON.stringify(data, null, 2));
        // for (const key in response) {
        //   if (response.hasOwnProperty(key)) {
        //     console.log(`${key}: ${JSON.stringify(response[key])}`);
        //   }
        // }
        alert("Đăng nhập thành công!");
        window.location.href = URLIndex;
      },
      error: function (error) {
        console.log(error);
        console.log(phone + " " + password + " " + whoAreYou);
        alert("Sai thông tin đăng nhập!");
      },
    });
  });
});
