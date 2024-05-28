import ModalTask from "./components/ModalTask";
import GridTaks from "./components/GridTaks";
import TasksProvider from "./provider/TasksProvider";
import NavCategories from "./components/NavCategories";
import LoadTask from "./components/LoadTask";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <main>
      <TasksProvider>

        <Nav/>

        <ModalTask/>

        <NavCategories/>

        <GridTaks/>
        
        <LoadTask/>

      </TasksProvider>
    </main>
  );
}