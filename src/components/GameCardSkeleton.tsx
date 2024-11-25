import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function GameCardSkeleton() {
  return (
    <div>
      <Card>
        <Skeleton height='200px'/>
        <CardBody>
            <SkeletonText />
        </CardBody>
      </Card>
    </div>
  )
}
