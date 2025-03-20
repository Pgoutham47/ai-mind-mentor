
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedText from './AnimatedText';

const FAQ = () => {
  const faqs = [
    {
      question: "How accurate is Insirra GPT?",
      answer: "Insirra GPT is built using advanced AI trained on vast datasets of startup knowledge, including insights from successful founders, investors, and industry experts. While it provides high-quality guidance, we recommend using it as a powerful starting point that complements (not replaces) traditional research and mentorship."
    },
    {
      question: "Is it free to use?",
      answer: "Yes! We offer a generous free tier that gives you access to most of Insirra GPT's capabilities. For users with more advanced needs, we offer premium plans with additional features like investor-ready report generation, custom data integration, and higher usage limits."
    },
    {
      question: "Can it help with funding?",
      answer: "Absolutely. Insirra GPT can help you create compelling pitch decks, financial projections, and investor-ready business plans. It can also analyze your business model to identify potential red flags investors might focus on, and suggest strategies to address them effectively."
    },
    {
      question: "How is my data protected?",
      answer: "We take data security very seriously. All communications with Insirra GPT are encrypted end-to-end, and we don't store your conversations permanently unless you explicitly save them. We never share your data with third parties, and our business model is based on providing valuable services to you, not monetizing your data."
    },
    {
      question: "How does Insirra GPT stay updated with the latest startup trends?",
      answer: "Our AI system is regularly updated with the latest market data, venture capital trends, and startup methodologies. We also incorporate feedback from real founders and investors to continuously improve the quality and relevance of our guidance."
    },
    {
      question: "Can I use Insirra GPT for my specific industry or niche?",
      answer: "Yes! Insirra GPT has knowledge across a wide range of industries and can provide tailored advice for your specific sector. Simply mention your industry when asking questions, and the AI will contextualize its responses accordingly."
    }
  ];

  return (
    <section id="faq" className="section bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-blue-300/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedText
            text="Frequently Asked Questions"
            className="text-3xl md:text-4xl font-bold mb-4"
          />
          <AnimatedText
            text="Find answers to common questions about Insirra GPT and how it can help your startup journey."
            className="text-lg text-muted-foreground"
            delay={200}
          />
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                <AccordionTrigger className="text-left font-medium py-4 hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#cta" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/20 inline-flex items-center"
          >
            Try AI Mentorship Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
