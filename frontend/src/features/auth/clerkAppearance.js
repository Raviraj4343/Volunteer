// Makes Clerk's prebuilt components match the Volunteer design system.
export const clerkAppearance = {
  variables: {
    colorPrimary: "#0d7a63",
    colorText: "#16181a",
    colorTextSecondary: "#6b7069",
    colorBackground: "#ffffff",
    colorInputBackground: "#ffffff",
    colorDanger: "#dc3d43",
    fontFamily: '"Plus Jakarta Sans Variable", ui-sans-serif, system-ui, sans-serif',
    borderRadius: "0.75rem",
  },
  elements: {
    card: "shadow-none border-0",
    rootBox: "w-full",
    cardBox: "w-full shadow-none sm:shadow-[0_8px_30px_rgb(16_24_20/0.08)] sm:border sm:border-[#e6e8e4] rounded-3xl",
    formButtonPrimary: "rounded-full h-11 text-[15px] font-semibold normal-case shadow-none",
    socialButtonsBlockButton: "rounded-full h-11 border-[#dfe2dd]",
    formFieldInput: "rounded-xl h-11",
    footerActionLink: "font-semibold",
    userButtonAvatarBox: "size-9",
  },
};
