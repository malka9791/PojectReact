import { Box, Typography } from "@mui/material";
import { color } from "@mui/system";
import Header from "./header";
const AboutUs = () => {
  return (
    <>
    <h2 style={{ color: "#d32f2f" }}>Foody</h2>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // ממקם את התוכן במרכז אופקית
        alignItems: "center", // ממקם את התוכן במרכז אנכית
        // padding: 2,
        textAlign: "center", // ממקם את הטקסט במרכז
      }}
    >
     
      <Typography
        variant="h5"
        sx={{
          maxWidth: "800px", // מגביל את רוחב הטקסט
          lineHeight: 1.6, // ריווח בין השורות
          fontSize: "1.2rem", // גודל פונט
          color: "#333", // צבע טקסט כהה
            direction:"rtl"
        }}
      >
        ברוכים הבאים ל-Foody, המיזם הקולינרי הגדול בישראל והראשון מסוגו, אשר
        מכיל מגוון עצום של תכנים קולינריים, תכניות בישול ומתכונים 
        . המיזם תוכנן ונבנה בהתאם לצרכים הקולינריים של הקהל הישראלי
        ומאחוריו עומדת שורה של אנשי קולינריה מהמשפיעים בישראל, ביניהם: שפים,
        בלוגרים, מתכונאים, מפיקים, יועצי מטבח, יועצים קולינאריים, צלמים ועוד.
      </Typography>
    </Box>
    </>
  );
};

export default AboutUs;
