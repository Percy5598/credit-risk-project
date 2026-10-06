const form = document.getElementById("loanForm");

const predictButton =
    document.getElementById("predictButton");

const errorMessage =
    document.getElementById("errorMessage");

const result =
    document.getElementById("result");

const riskResult =
    document.getElementById("riskResult");

const probabilityText =
    document.getElementById("probabilityText");

const probabilityBar =
    document.getElementById("probabilityBar");

const predictionValue =
    document.getElementById("predictionValue");

const thresholdValue =
    document.getElementById("thresholdValue");

const resetButton =
    document.getElementById("resetButton");


form.addEventListener("submit", async function (event) {

    event.preventDefault();

    errorMessage.classList.add("hidden");
    result.classList.add("hidden");

    predictButton.disabled = true;
    predictButton.textContent = "Calculating...";


    const formData = new FormData(form);


    const data = {

        person_age:
            Number(formData.get("person_age")),

        person_income:
            Number(formData.get("person_income")),

        person_home_ownership:
            formData.get("person_home_ownership"),

        person_emp_length:
            Number(formData.get("person_emp_length")),

        loan_intent:
            formData.get("loan_intent"),

        loan_grade:
            formData.get("loan_grade"),

        loan_amnt:
            Number(formData.get("loan_amnt")),

        loan_int_rate:
            Number(formData.get("loan_int_rate")),

        loan_percent_income:
            Number(formData.get("loan_percent_income")),

        cb_person_default_on_file:
            formData.get("cb_person_default_on_file"),

        cb_person_cred_hist_length:
            Number(
                formData.get(
                    "cb_person_cred_hist_length"
                )
            )
    };


    try {

        const response = await fetch(
            "/predict",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        const responseData =
            await response.json();


        if (!response.ok) {

            throw new Error(
                responseData.detail ||
                `HTTP error ${response.status}`
            );
        }


        const probability =
            Number(
                responseData.default_probability
            );

        const percentage =
            probability * 100;


        riskResult.textContent =
            responseData.Result;


        probabilityText.textContent =
            `${percentage.toFixed(2)}%`;


        probabilityBar.style.width =
            `${Math.min(percentage, 100)}%`;


        predictionValue.textContent =
            responseData.default_prediction;


        thresholdValue.textContent =
            Number(
                responseData.threshold
            ).toFixed(4);


        result.classList.remove("hidden");


        result.scrollIntoView({
            behavior: "smooth"
        });

    }

    catch (error) {

        errorMessage.textContent =
            `Prediction failed: ${error.message}`;

        errorMessage.classList.remove(
            "hidden"
        );

    }

    finally {

        predictButton.disabled = false;

        predictButton.textContent =
            "Predict Credit Risk";
    }

});


resetButton.addEventListener(
    "click",
    function () {

        form.reset();

        result.classList.add("hidden");

        errorMessage.classList.add(
            "hidden"
        );

        probabilityBar.style.width = "0%";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);