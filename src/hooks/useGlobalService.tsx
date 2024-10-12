import DOMPurify from "dompurify";

const useGlobalService = () => {
  const sanitizeHtml = (html: string) => {
    return DOMPurify.sanitize(html);
  };

  const numberToOrdinal = (num: number) => {
    const ordinals = [
      "First",
      "Second",
      "Third",
      "Fourth",
      "Fifth",
      "Sixth",
      "Seventh",
      "Eighth",
      "Ninth",
      "Tenth",
    ];
    return ordinals[num - 1] || num + "th";
  };

  const formatString = (str: string) => {
    return str
      .split("_") // Split by underscores
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join the words with spaces
  };

  return {
    sanitizeHtml,
    numberToOrdinal,
    formatString,
  };
};

export default useGlobalService;
