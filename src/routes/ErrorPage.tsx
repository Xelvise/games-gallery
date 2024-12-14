import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
// import NavBar from "../components/NavBar";

export default function ErrorPage() {
    const error = useRouteError()
    return (
      <>
          <Box padding={5}>
              <Heading fontSize={'2xl'}>Oops...</Heading>
              {isRouteErrorResponse(error)
                  ? <Text>This Page does not exist</Text>
                  : <Text>Sorry, an unexpected error has occurred.</Text>
              }
          </Box>
      </>
    );
};