import { Box, Typography } from "@mui/material";
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
            direction: "rtl",
          }}
        >
          אצלנו ב" Foody " תמצאו עוגות משובחות, מעשה יד אומן, הנעשות בהשגחה
          מהודרת ובקפידה רבה, לשמח לב כל בית יהודי. אנו מציעים מגוון עוגות
          לאירועים משפחתיים, שמחות, שבתות וחגים — הכל בעיצוב נאה, בטעם מעודן
          ובאווירה נעימה. 🍰 מה תמצאו באתר? – קטלוג עוגות מרהיב לפי סוגים
          ואירועים – אפשרות להזמנה אישית בהתאמה לצורכי המשפחה – גלריית תמונות
          להתרשמות – שירות אדיב ומהיר, בהקפדה על כל פרט
        </Typography>
      </Box>
    </>
  );
};

export default AboutUs;
