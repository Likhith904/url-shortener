import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) navigate(`/auth?createNew=${url}`);
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 text-center text-3xl font-extrabold text-white sm:my-16 sm:text-6xl lg:text-6xl">
        &quot;Transform Your Long URLs into Short, Shareable Links in Seconds!
        👇&quot;
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-2 sm:h-14 sm:flex-row md:w-2/4"
      >
        <Input
          type="url"
          value={url}
          placeholder="Enter your looong URL!!!"
          onChange={(e) => setUrl(e.target.value)}
          className="h-full flex-1 px-4 py-4"
        />
        <Button className="h-full" type="submit" variant="destructive">
          Convert!!
        </Button>
      </form>

      {/* //TODO: add a banner image  */}
      <img
        src="./banner1.jpg"
        alt="image of url shortener"
        className="my-11 w-full rounded-sm md:px-11"
      />
      <Accordion type="multiple" collapsible className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is a URL shortener?</AccordionTrigger>
          <AccordionContent>
            A URL shortener is a tool that takes a long URL and turns it into a
            shorter, more manageable link. This makes the URL easier to share
            and remember.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does a URL shortener work?</AccordionTrigger>
          <AccordionContent>
            When you input a long URL into a URL shortener, it generates a
            unique short URL that redirects users to the original long URL when
            clicked.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Are shortened URLs permanent?</AccordionTrigger>
          <AccordionContent>
            Generally, yes. Most URL shorteners keep the shortened URLs active
            indefinitely, but some services may have expiration dates or require
            periodic activity to maintain the link.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Can I customize my shortened URL?</AccordionTrigger>
          <AccordionContent>
            Yes, we allow you to customize the ending of the short URL to make
            it more recognizable or relevant to your content.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Are URL shorteners free to use?</AccordionTrigger>
          <AccordionContent>
            We offer free services with basic features. Premium plans with
            advanced features like custom domains, enhanced analytics, and
            increased link limits are usually available for a minimal fee.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;
