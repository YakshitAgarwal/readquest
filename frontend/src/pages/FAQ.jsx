import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Navbar from "../components/Navbar";

const FAQ = ({ user, setUser }) => {
  const id = React.useId();

  const faqs = [
    {
      question: "What is ReadQuest?",
      answer:
        "ReadQuest is a platform where readers can access premium content by completing sponsored tasks or making a small payment.",
    },
    {
      question: "How does unlocking a blog work?",
      answer:
        "You can unlock a premium blog either by making a small payment or by completing an eligible sponsored task.",
    },
    {
      question: "Do I have to pay every time I read a blog?",
      answer:
        "No. Once you unlock a blog, it is added to your account and you can access it again without paying again.",
    },
    {
      question: "What are sponsored tasks?",
      answer:
        "Sponsored tasks are created by companies that want to reach readers. Completing an eligible task can give you access to premium content.",
    },
    {
      question: "Can companies create their own tasks?",
      answer:
        "Yes. Companies can create sponsored tasks, provide the required details and fund the campaign.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9] p-6">
      <div className="flex justify-center">
        <Navbar user={user} setUser={setUser} />
      </div>
      <section className="w-full px-6 py-20 md:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-black md:text-5xl">
              Frequently Asked Questions
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500">
              Everything you need to know about reading, unlocking, and
              sponsoring content on ReadQuest.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <Accordion
                key={faq.question}
                disableGutters
                elevation={0}
                sx={{
                  border: "1px solid #e5e5e5",
                  borderRadius: "16px !important",
                  backgroundColor: "#ffffff",
                  overflow: "hidden",

                  "&:before": {
                    display: "none",
                  },

                  "&.Mui-expanded": {
                    margin: 0,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls={`${id}-panel${index}-content`}
                  id={`${id}-panel${index}-header`}
                  sx={{
                    minHeight: "64px",
                    px: 3,

                    "&.Mui-expanded": {
                      minHeight: "64px",
                    },

                    "& .MuiAccordionSummary-content": {
                      margin: "18px 0",
                    },

                    "& .MuiAccordionSummary-content.Mui-expanded": {
                      margin: "18px 0",
                    },

                    "& .MuiSvgIcon-root": {
                      fontSize: "22px",
                      color: "#555",
                    },
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "18px",
                      fontWeight: 500,
                      color: "#111",
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    px: 3,
                    pb: 3,
                    pt: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      lineHeight: 1.7,
                      color: "#666",
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
