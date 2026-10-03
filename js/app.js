
function isValidStudentNumber(value) {
    const trimmedValue = value.trim();

    return /^\d{2}-\d{4}-\d{3}$/.test(trimmedValue);
}


function isValidPassword(value) {
    return /^(?=\S{8,}$)(?=.*[A-Z])(?=.*\d)(?=.*[@$!]).*$/.test(value);
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}


if (typeof document !== "undefined") {

    const registrationForm =
        document.querySelector("#registrationForm");

    const fullName =
        document.querySelector("#fullName");

    const studentNumber =
        document.querySelector("#studentNumber");

    const email =
        document.querySelector("#email");

    const mobileNumber =
        document.querySelector("#mobileNumber");

    const password =
        document.querySelector("#password");

    const confirmPassword =
        document.querySelector("#confirmPassword");

    const course =
        document.querySelector("#course");

    const terms =
        document.querySelector("#terms");

    const resetBtn =
        document.querySelector("#resetBtn");


    const fullNameError =
        document.querySelector("#fullNameError");

    const studentNumberError =
        document.querySelector("#studentNumberError");

    const emailError =
        document.querySelector("#emailError");

    const mobileError =
        document.querySelector("#mobileError");

    const passwordError =
        document.querySelector("#passwordError");

    const confirmPasswordError =
        document.querySelector("#confirmPasswordError");

    const courseError =
        document.querySelector("#courseError");

    const termsError =
        document.querySelector("#termsError");

    const passwordFeedback =
        document.querySelector("#passwordFeedback");


    const successMessage =
        document.querySelector("#successMessage");

    const registrationSummary =
        document.querySelector("#registrationSummary");


    const summaryName =
        document.querySelector("#summaryName");

    const summaryStudentNumber =
        document.querySelector("#summaryStudentNumber");

    const summaryEmail =
        document.querySelector("#summaryEmail");

    const summaryMobileNumber =
        document.querySelector("#summaryMobileNumber");

    const summaryCourse =
        document.querySelector("#summaryCourse");


    function setError(field, errorElement, message) {

        errorElement.textContent = message;
        field.setAttribute("aria-invalid", "true");
    }


    function clearError(field, errorElement) {

        errorElement.textContent = "";
        field.setAttribute("aria-invalid", "false");
    }


   
    function validateFullName() {

        const value = fullName.value.trim();

        if (value.length < 2) {

            setError(
                fullName,
                fullNameError,
                "Enter your full name."
            );

            return false;
        }

        clearError(fullName, fullNameError);

        return true;
    }


    function validateStudentNumber() {

        const value = studentNumber.value.trim();

        if (!isValidStudentNumber(value)) {

            setError(
                studentNumber,
                studentNumberError,
                "Enter a student number in the format 24-1234-123."
            );

            return false;
        }

        clearError(studentNumber, studentNumberError);

        return true;
    }



    function validateEmail() {

        const value = email.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(value)) {

            setError(
                email,
                emailError,
                "Enter a valid email address."
            );

            return false;
        }

        clearError(email, emailError);

        return true;
    }


    function validateMobileNumber() {

        const value = mobileNumber.value.trim();

        const mobilePattern =
            /^(09\d{9}|\+639\d{9})$/;

        if (!mobilePattern.test(value)) {

            setError(
                mobileNumber,
                mobileError,
                "Enter a mobile number starting with 09 or +639."
            );

            return false;
        }

        clearError(mobileNumber, mobileError);

        return true;
    }


    function validatePassword() {

        if (!isValidPassword(password.value)) {

            setError(
                password,
                passwordError,
                "Password must be at least 8 characters, contain one uppercase letter, one digit, and one of @, $, or !, with no spaces."
            );

            return false;
        }

        clearError(password, passwordError);

        return true;
    }


    function validateConfirmPassword() {

        if (
            confirmPassword.value === "" ||
            confirmPassword.value !== password.value
        ) {

            setError(
                confirmPassword,
                confirmPasswordError,
                "Passwords do not match."
            );

            return false;
        }

        clearError(
            confirmPassword,
            confirmPasswordError
        );

        return true;
    }


    function validateCourse() {

        if (
            course.value !== "BSIT" &&
            course.value !== "BSCS"
        ) {

            setError(
                course,
                courseError,
                "Please select BSIT or BSCS."
            );

            return false;
        }

        clearError(course, courseError);

        return true;
    }


    function validateTerms() {

        if (!terms.checked) {

            setError(
                terms,
                termsError,
                "You must agree to the terms and conditions."
            );

            return false;
        }

        clearError(terms, termsError);

        return true;
    }


    password.addEventListener("input", function() {

        if (isValidPassword(password.value)) {

            passwordFeedback.textContent =
                "Password meets all requirements.";

        } else {

            passwordFeedback.textContent =
                "Password needs at least 8 characters, one uppercase letter, one digit, and one of @, $, or !, with no spaces.";
        }

        if (password.value !== "") {
            validatePassword();
        }

        if (confirmPassword.value !== "") {
            validateConfirmPassword();
        }
    });



    fullName.addEventListener("blur", function() {

        validateFullName();

    });


    course.addEventListener("change", function() {

        validateCourse();

    });


    terms.addEventListener("change", function() {

        validateTerms();

    });


    registrationForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const validFullName =
            validateFullName();

        const validStudentNumber =
            validateStudentNumber();

        const validEmail =
            validateEmail();

        const validMobileNumber =
            validateMobileNumber();

        const validPassword =
            validatePassword();

        const validConfirmPassword =
            validateConfirmPassword();

        const validCourse =
            validateCourse();

        const validTerms =
            validateTerms();


        const allValid =
            validFullName &&
            validStudentNumber &&
            validEmail &&
            validMobileNumber &&
            validPassword &&
            validConfirmPassword &&
            validCourse &&
            validTerms;


        if (!allValid) {

            successMessage.textContent = "";
            successMessage.hidden = true;

            registrationSummary.hidden = true;

            return;
        }


        successMessage.textContent =
            "Registration details validated successfully!";

        successMessage.hidden = false;


        summaryName.textContent =
            fullName.value.trim();

        summaryStudentNumber.textContent =
            studentNumber.value.trim();

        summaryEmail.textContent =
            email.value.trim();

        summaryMobileNumber.textContent =
            mobileNumber.value.trim();

        summaryCourse.textContent =
            course.value;


        registrationSummary.hidden = false;
    });


    
    resetBtn.addEventListener("click", function() {

        registrationForm.reset();

        fullNameError.textContent = "";
        studentNumberError.textContent = "";
        emailError.textContent = "";
        mobileError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";
        courseError.textContent = "";
        termsError.textContent = "";

        passwordFeedback.textContent = "";

        fullName.setAttribute("aria-invalid", "false");
        studentNumber.setAttribute("aria-invalid", "false");
        email.setAttribute("aria-invalid", "false");
        mobileNumber.setAttribute("aria-invalid", "false");
        password.setAttribute("aria-invalid", "false");
        confirmPassword.setAttribute("aria-invalid", "false");
        course.setAttribute("aria-invalid", "false");
        terms.setAttribute("aria-invalid", "false");

        successMessage.textContent = "";
        successMessage.hidden = true;

        registrationSummary.hidden = true;

        summaryName.textContent = "";
        summaryStudentNumber.textContent = "";
        summaryEmail.textContent = "";
        summaryMobileNumber.textContent = "";
        summaryCourse.textContent = "";
    });

}