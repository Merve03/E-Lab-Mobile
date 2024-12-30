// Define the tabs for admin users
export const adminTabs = [
  {
    name: "Dashboard", // Tab name to display
    component: require("../screens/AdminDashboard").default, // Path to the component for this tab
    iconName: "stats-chart-outline", // Icon name for the tab
  },
  {
    name: "List Patients", // Tab name to display
    component: require("../components/PatientsList").default, // Path to the component for this tab
    iconName: "people-outline", // Icon name for the tab
  },
  {
    name: "Admin Profile", // Tab name to display
    component: require("../components/AccountDetails").default, // Path to the component for this tab
    iconName: "person-outline", // Icon name for the tab
  },
];

// Define the tabs for regular users
export const userTabs = [
  {
    name: "Home", // Tab name to display
    component: require("../screens/UserDashboard").default, // Path to the component for this tab
    iconName: "stats-chart-outline", // Icon name for the tab
  },
  {
    name: "User Profile", // Tab name to display
    component: require("../components/AccountDetails").default, // Path to the component for this tab
    iconName: "person-outline", // Icon name for the tab
  },
];
