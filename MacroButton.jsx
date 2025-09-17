const MacroButton = () => {
  const history = useHistory();

  function clickFirstClickableWithText(text) {
    let tries = 0;
    const timer = setInterval(() => {
      // Get all elements that could be clickable
      const candidates = Array.from(
        document.querySelectorAll(
          'button, a, [onclick], [role="button"], [tabindex], [data-headlessui-state]'
        )
      );
      const matches = candidates.filter((curr) => {
        const isMatch = curr.textContent.trim() === text;
        if (!isMatch) return false;
        const isVisible = !!(
          curr.offsetWidth ||
          curr.offsetHeight ||
          curr.getClientRects().length
        );
        const isEnabled = !curr.disabled;
        const hasClickHandler =
          typeof curr.onclick === "function" || curr.hasAttribute("onclick");
        const isRoleButton = curr.getAttribute("role") === "button";
        const hasTabIndex = curr.hasAttribute("tabindex");
        return (
          isVisible &&
          isEnabled &&
          (hasClickHandler || isRoleButton || hasTabIndex)
        );
      });
      if (matches.length > 0) {
        matches[0].click();
        clearInterval(timer);
      } else if (++tries >= 20) {
        clearInterval(timer);
      }
    }, 500);
  }

  const runMacro = () => {
    // YOUR CODE HERE -> EXAMPLE BELOW
    history.push("/live");
    clickFirstClickableWithText("Next");
    clickFirstClickableWithText("Everyone");
    clickFirstClickableWithText("Next");
    clickFirstClickableWithText("Broadcast using another app");
  };

  return (
    <button
      className="tw-bg-[tomato] tw-text-white tw-block tw-w-full tw-px-4 tw-py-2 tw-text-left tw-text-sm tw-text-gray-700 tw-outline-none focus:tw-outline-none"
      type="button"
      onClick={runMacro}
    >
      M
    </button>
  );
};
