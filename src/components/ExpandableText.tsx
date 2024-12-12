import { useState } from "react";
import { Button, Text } from "@chakra-ui/react";

interface Props {
    children: string;
    maxChars?: number 
};

export default function ExpandableText({children: text, maxChars=300}: Props) {
    const [isExpanded, setExpanded] = useState(false)

    if (text.length <= maxChars)
        return <Text>{text}</Text>
    
    const fullText = isExpanded ? text : text.slice(0, maxChars)+'...'
    return (
        <Text>
            {fullText}
            <Button onClick={() => setExpanded(!isExpanded)} colorScheme={'yellow'} size={'xs'} marginLeft={3}>
                {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
        </Text>
    )
}