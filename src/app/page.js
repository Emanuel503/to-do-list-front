import ModalTask from "./components/ModalTask";
import GridTaks from "./components/GridTaks";
import TasksProvider from "./provider/TasksProvider";
import NavCategories from "./components/NavCategories";
import LoadTask from "./components/LoadTask";

export default function Home() {
  return (
    <main className="mx-20">
      <TasksProvider>

        <ModalTask/>

        <NavCategories/>

        <GridTaks/>
        
        <LoadTask/>

      </TasksProvider>
    </main>
  );
}