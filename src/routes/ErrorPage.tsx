import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
// import NavBar from "../components/NavBar";

const ErrorPage = () => {
    const error = useRouteError()
  return (
    <>
        {/* <NavBar />
        <Box paddingLeft={5}> */}
            <Heading fontSize={'2xl'}>Oops...</Heading>
            {isRouteErrorResponse(error)
                ? <Text>This Page does not exist</Text>
                : <Text>Sorry, an unexpected error has occurred.</Text>
            }
        {/* </Box> */}
    </>
  );
};

export default ErrorPage;
