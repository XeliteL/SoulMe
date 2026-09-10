import Accordion from "@/shared/ui/Accordion"
import AccordionGroup from "@/shared/ui/AccordionGroup"
import Button from "@/shared/ui/Button"
import Section from "@/widgets/Section"

import { questionItems } from "./config/questionItems"

import "./Questions.scss"

const Questions = () => {
  return (
    <Section
      title="Часто задаваемые вопросы"
      id="questions"
      titleId="questions-title"
      description="Остались вопросы? Загляните в FAQ, здесь вы найдёте ответы на самые частые вопросы о SoulMe!"
      actions={<Button label="Задать вопрос" href="/support" />}
    >
      <AccordionGroup columns={2}>
        {questionItems.map((question, index) => (
          <Accordion
            title={question.question}
            id={`question-${index}`}
            name="questions"
            key={index}
          >
            <p>{question.answer}</p>
          </Accordion>
        ))}
      </AccordionGroup>
    </Section>
  )
}

export default Questions
