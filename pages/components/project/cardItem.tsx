import { Box, Card, CardBody, CardFooter, Heading, Img, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { ProjectInterface } from "./project";

const CardItem = ({ data }: { data: ProjectInterface.Project }) => {
  const title = data?.properties?.Project.title[0].plain_text; //Notion 프로젝트별 Title
  const tags = data?.properties?.Tags.multi_select; // Notion 프로젝트별 Tags
  const work = data?.properties?.Work.rich_text[0].plain_text; // Notion 프로젝트별 Work
  const date = data?.properties?.Date.rich_text[0].plain_text; // Notion 프로젝트별 Date
  const imgSrc = data?.cover?.file.url || data?.cover?.external.url; // Notion 프로젝트별 Image

  //Project 별 Tag 데이터 보여주기
  const project_Tag = tags.map((tag: ProjectInterface.Tag) => {
    let textColorClass = "text-white";
  // 밝은 색상 텍스트 색상을 검정색으로 설정
  if (tag.color === "pink" || tag.color === "orange") {
    textColorClass = "text-black";
  }

  return (
    <Text key={tag.id} className={`text-center px-2 py-1 mr-1 rounded-md ${textColorClass}`} style={{ backgroundColor: tag.color }}>
      {tag.name}
    </Text>
  );
  });
  
  //workText - 을 기준으로 띄어쓰기
  const workText = work?.split("-")?.map((item: string, index: number) => (
    <Box key={index} className="ml-2 mr-2">
      <Text>{`${item.trim()}`}</Text>
    </Box>
  ));
  

  return (
    <>
      <Box className="project-card" mt="10%">
        <Card className="flex flex-col relative">
          <CardBody className="flex flex-col h-full pb-8">
            <Img
              src={imgSrc}
              alt="cover image"
              className="rounded-xl"
            />
            <Stack mt="auto" spacing="10">
              <Heading className="text-base ml-2 mr-2">{title}</Heading>
              <Heading className="text-md ml-2 mr-2">{date}</Heading>
              <Box className="text-lg mb-2">{workText}</Box>
              <Box className="flex place-content-center fixed bottom-1 w-full">{project_Tag}</Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default CardItem;
