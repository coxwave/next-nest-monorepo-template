interface Props {
  className?: string;
}

export default function LineLogo({ className }: Props) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M25.817 13.1517C25.9299 13.1478 26.0425 13.1667 26.148 13.2073C26.2535 13.2478 26.3498 13.3092 26.431 13.3877C26.5123 13.4662 26.577 13.5603 26.6211 13.6643C26.6653 13.7684 26.688 13.8802 26.688 13.9932C26.688 14.1063 26.6653 14.2181 26.6211 14.3222C26.577 14.4262 26.5123 14.5203 26.431 14.5988C26.3498 14.6773 26.2535 14.7387 26.148 14.7792C26.0425 14.8198 25.9299 14.8386 25.817 14.8347H23.478V16.3347H25.817C25.9306 16.3292 26.0442 16.3468 26.1508 16.3864C26.2574 16.4261 26.3549 16.487 26.4373 16.5655C26.5197 16.6439 26.5852 16.7383 26.6301 16.8428C26.6749 16.9474 26.698 17.06 26.698 17.1737C26.698 17.2875 26.6749 17.4001 26.6301 17.5046C26.5852 17.6092 26.5197 17.7036 26.4373 17.782C26.3549 17.8605 26.2574 17.9214 26.1508 17.961C26.0442 18.0007 25.9306 18.0183 25.817 18.0127H22.64C22.4179 18.0119 22.2052 17.9232 22.0483 17.766C21.8915 17.6088 21.8033 17.3958 21.803 17.1737V10.8137C21.803 10.3507 22.178 9.97074 22.64 9.97074H25.823C26.0389 9.9819 26.2423 10.0757 26.391 10.2327C26.5396 10.3897 26.6222 10.5979 26.6215 10.8141C26.6209 11.0303 26.5371 11.238 26.3875 11.3942C26.2379 11.5503 26.034 11.6429 25.818 11.6527H23.479V13.1527L25.817 13.1517ZM20.683 17.1727C20.6812 17.3955 20.5915 17.6084 20.4334 17.7654C20.2753 17.9223 20.0617 18.0105 19.839 18.0107C19.7071 18.012 19.5768 17.9826 19.4582 17.9248C19.3397 17.867 19.2362 17.7824 19.156 17.6777L15.901 13.2507V17.1717C15.901 17.3943 15.8126 17.6077 15.6553 17.765C15.4979 17.9223 15.2845 18.0107 15.062 18.0107C14.8395 18.0107 14.6261 17.9223 14.4687 17.765C14.3114 17.6077 14.223 17.3943 14.223 17.1717V10.8117C14.223 10.4527 14.458 10.1307 14.796 10.0157C14.8795 9.98626 14.9675 9.9717 15.056 9.97274C15.316 9.97274 15.556 10.1137 15.717 10.3117L18.998 14.7487V10.8117C18.998 10.3487 19.373 9.96874 19.837 9.96874C20.301 9.96874 20.681 10.3487 20.681 10.8117L20.683 17.1727ZM13.027 17.1727C13.0259 17.3958 12.9365 17.6093 12.7783 17.7666C12.6201 17.9239 12.4061 18.012 12.183 18.0117C11.9616 18.0099 11.7499 17.9207 11.5939 17.7636C11.4379 17.6065 11.3503 17.3941 11.35 17.1727V10.8127C11.35 10.3497 11.725 9.96974 12.189 9.96974C12.652 9.96974 13.028 10.3497 13.028 10.8127L13.027 17.1727ZM9.74 18.0117H6.557C6.33418 18.0112 6.12056 17.9228 5.96254 17.7657C5.80451 17.6086 5.71484 17.3956 5.713 17.1727V10.8127C5.713 10.3497 6.093 9.96974 6.557 9.96974C7.021 9.96974 7.396 10.3497 7.396 10.8127V16.3337H9.74C9.96252 16.3337 10.1759 16.4221 10.3333 16.5795C10.4906 16.7368 10.579 16.9502 10.579 17.1727C10.579 17.3953 10.4906 17.6087 10.3333 17.766C10.1759 17.9233 9.96252 18.0117 9.74 18.0117V18.0117ZM32 13.7497C32 6.58874 24.817 0.760742 16 0.760742C7.183 0.760742 0 6.58874 0 13.7497C0 20.1667 5.693 25.5417 13.38 26.5627C13.901 26.6717 14.609 26.9067 14.792 27.3497C14.953 27.7497 14.896 28.3697 14.844 28.7927L14.625 30.1517C14.562 30.5527 14.302 31.7307 16.021 31.0117C17.745 30.2927 25.245 25.5747 28.604 21.7087C30.901 19.1937 32 16.6097 32 13.7497Z"
        fill="white"
      />
    </svg>
  );
}
