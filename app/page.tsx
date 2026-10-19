import { Anatomy } from "./_components/anatomy";
import { Cover } from "./_components/cover";
import { Colophon, EditorialNote } from "./_components/editorial-note";
import { Feature } from "./_components/feature";
import { Finale } from "./_components/finale";
import { Gate } from "./_components/gate";
import { Lookbook } from "./_components/lookbook";
import { Quiz } from "./_components/quiz";
import { Roles } from "./_components/roles";
import { Wishes } from "./_components/wishes";

export default function Home() {
  return (
    <>
      <Gate />
      <Cover />
      <main>
        <Feature />
        <Anatomy />
        <Lookbook />
        <Roles />
        <Quiz />
        <Wishes />
        <EditorialNote />
        <Finale />
      </main>
      <Colophon />
    </>
  );
}
