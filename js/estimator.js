const estimatorForm = document.getElementById("estimatorForm");
const projectType = document.getElementById("projectType");
const numberOfPages = document.getElementById("numberOfPages");
const delivery = document.getElementById("delivery");

const seo = document.getElementById("seo");
const contactFormFeature = document.getElementById("contactForm");
const blog = document.getElementById("blog");
const uiUx = document.getElementById("uiux");
const maintenance = document.getElementById("maintenance");

const estimateEmpty = document.getElementById("estimateEmpty");
const estimateResult = document.getElementById("estimateResult");
const estimatedPrice = document.getElementById("estimatedPrice");
const resultProjectType = document.getElementById("resultProjectType");
const resultPages = document.getElementById("resultPages");
const resultDelivery = document.getElementById("resultDelivery");

const projectPrices = {
    "landing-page": 1500000,
    "company-profile": 3000000,
    portfolio: 2500000,
    ecommerce: 5000000
};

const projectNames = {
    "landing-page": "Landing Page",
    "company-profile": "Company Profile",
    portfolio: "Portfolio Website",
    ecommerce: "E-Commerce Website"
};

const featurePrices = {
    seo: 500000,
    contactForm: 300000,
    blog: 750000,
    uiUx: 1000000,
    maintenance: 500000
};

const deliveryPrices = {
    standard: 0,
    priority: 1000000,
    express: 2000000
};

const deliveryNames = {
    standard: "Standard - 14 Days",
    priority: "Priority - 7 Days",
    express: "Express - 3 Days"
};

const additionalPagePrice = 300000;

function calculateProjectPrice() {
    return projectPrices[projectType.value] || 0;
}

function calculatePagePrice() {
    const pages = Number(numberOfPages.value);
    return pages > 1 ? (pages - 1) * additionalPagePrice : 0;
}

function calculateFeaturePrice() {
    let total = 0;

    if (seo.checked) {
        total += featurePrices.seo;
    }

    if (contactFormFeature.checked) {
        total += featurePrices.contactForm;
    }

    if (blog.checked) {
        total += featurePrices.blog;
    }

    if (uiUx.checked) {
        total += featurePrices.uiUx;
    }

    if (maintenance.checked) {
        total += featurePrices.maintenance;
    }

    return total;
}

function calculateDeliveryPrice() {
    return deliveryPrices[delivery.value] || 0;
}

function formatCurrency(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(value);
}

function showEstimate(totalPrice) {
    estimateEmpty.classList.add("d-none");
    estimateResult.classList.remove("d-none");

    estimatedPrice.textContent = formatCurrency(totalPrice);
    resultProjectType.textContent = projectNames[projectType.value];
    resultPages.textContent = numberOfPages.value;
    resultDelivery.textContent = deliveryNames[delivery.value];
}

estimatorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const totalPrice =
        calculateProjectPrice() +
        calculatePagePrice() +
        calculateFeaturePrice() +
        calculateDeliveryPrice();

    showEstimate(totalPrice);
});
