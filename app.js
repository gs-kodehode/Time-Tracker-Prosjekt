const activityList = [
  {
    title: "Work",
    hours: { daily: 5, weekly: 32, monthly: 103 },
    prevHours: { daily: 7, weekly: 36, monthly: 128 },
  },
  {
    title: "Play",
    hours: { daily: 1, weekly: 10, monthly: 23 },
    prevHours: { daily: 2, weekly: 8, monthly: 29 },
  },
  {
    title: "Study",
    hours: { daily: 0, weekly: 4, monthly: 13 },
    prevHours: { daily: 1, weekly: 7, monthly: 19 },
  },
  {
    title: "Exercise",
    hours: { daily: 1, weekly: 4, monthly: 11 },
    prevHours: { daily: 1, weekly: 5, monthly: 18 },
  },
  {
    title: "Social",
    hours: { daily: 1, weekly: 5, monthly: 21 },
    prevHours: { daily: 3, weekly: 10, monthly: 23 },
  },
  {
    title: "Self Care",
    hours: { daily: 0, weekly: 2, monthly: 7 },
    prevHours: { daily: 1, weekly: 2, monthly: 11 },
  },
];
//// Info av bruker (navn og bilde)
const userInfo = { name: "Jeremy Robson", image: "./images/image-jeremy.png" };
// Henter DOM-elementer skal bruke etterpå!
const containerElement = document.querySelector("#Container");
const profileElement = document.querySelector("#user-profile");
const dailyBtn = document.querySelector("#daily");
const weeklyBtn = document.querySelector("#weekly");
const monthlyBtn = document.querySelector("#monthly");
// Oppretter og legger til bruker navn og bilde i profil området!
const userNameElement = document.createElement("h3");
const userImageElement = document.createElement("img");
userNameElement.textContent = userInfo.name;
userImageElement.src = userInfo.image;
userImageElement.id = "user-image";
// Legge til bilde og navn i profil område!
profileElement.append(userImageElement, "Report for", userNameElement);
// Funksjon for å lage kortene for hver aktivitet
const createActivityCard = ({ title, hours, prevHours }) => {
  const activityCard = document.createElement("div");
  const activityContent = document.createElement("div");
  const activityTitle = document.createElement("h4");
  const ellipsisIcon = document.createElement("img");
  const currentData = document.createElement("h2");
  const previousData = document.createElement("p");
  // Legger til klasser og id for styling
  activityCard.classList.add("card-containers");
  activityCard.id = title.toLowerCase().replace(" ", "-"); // Bruker tittelen som e ID
  activityCard.style.backgroundImage = `url(images/icon-${title
    .toLowerCase()
    .replace(" ", "-")}.svg)`;
  // Legger til innhold i kortet
  activityContent.classList.add("card-content");

  activityTitle.textContent = title;
  ellipsisIcon.src = "./images/icon-ellipsis.svg";

  activityTitle.append(ellipsisIcon);
  activityContent.append(activityTitle, currentData, previousData);
  activityCard.append(activityContent);

  // Lagre elemente skal oppdatere etter på!
  activityCard.currentData = currentData;
  activityCard.previousData = previousData;

  return activityCard;
};
// Funksjon; å legge til alle aktivitetene som kort på siden!
const appendActivityCards = () => {
  activityList.map((activity) => {
    // Ved brukt av .map() for å lage kort for hver aktivitete!
    const activityCard = createActivityCard(activity);
    containerElement.appendChild(activityCard);
  });
};
// Funksjon for å oppdatere aktivitet timer basert på valgt periode!
const updateActivityData = (
  hours,
  prevHours,
  currentData,
  previousData,
  period
) => {
  let currentText, prevText;
  // hva som skal vise av data basert på valgt periode ved brukt av if / else
  if (period === "daily") {
    currentText = `${hours.daily}hrs`;
    prevText = `Yesterday - ${prevHours.daily}hrs`;
  } else if (period === "weekly") {
    currentText = `${hours.weekly}hrs`;
    prevText = `Last Week - ${prevHours.weekly}hrs`;
  } else if (period === "monthly") {
    currentText = `${hours.monthly}hrs`;
    prevText = `Last month - ${prevHours.monthly}hrs`;
  } else {
    currentText = `${hours.daily}hrs`; // Default til daglig visning!
    prevText = `Yesterday - ${prevHours.daily}hrs`;
  }
  // Oppdaterer teksten i kortet med den nye informasjon
  currentData.textContent = currentText;
  previousData.textContent = prevText;
};
// Funksjon for å bytte til den valgt periode og oppdatere alle aktivitetene!
const switchToPeriod = (period) => {
  activityList.forEach(({ title, hours, prevHours }) => {
    const activityCard = document.querySelector(
      `#${title.toLowerCase().replace(" ", "-")}`
    );
    const currentData = activityCard.currentData;
    const previousData = activityCard.previousData;
    updateActivityData(hours, prevHours, currentData, previousData, period);
  });
};
// Ved brukt av Eventlister på knappene for å bytte visningsperiode!
dailyBtn.addEventListener("click", () => {
  if (dailyBtn.classList.contains("active")) return;
  dailyBtn.classList.add("active");
  weeklyBtn.classList.remove("active");
  monthlyBtn.classList.remove("active");
  switchToPeriod("daily");
});

weeklyBtn.addEventListener("click", () => {
  if (weeklyBtn.classList.contains("active")) return;
  weeklyBtn.classList.add("active");
  dailyBtn.classList.remove("active");
  monthlyBtn.classList.remove("active");
  switchToPeriod("weekly");
});

monthlyBtn.addEventListener("click", () => {
  if (monthlyBtn.classList.contains("active")) return;
  monthlyBtn.classList.add("active");
  dailyBtn.classList.remove("active");
  weeklyBtn.classList.remove("active");
  switchToPeriod("monthly");
});

// Når siden lastes, initialiserer kortene og setter standardperiode til daglig!
appendActivityCards();
switchToPeriod("daily");
