import ModalTask from "./components/ModalTask";
import GridTaks from "./components/GridTaks";
import TasksProvider from "./provider/TasksProvider";

export default function Home() {
  return (
    <main className="mx-20">
      <TasksProvider>
        <ModalTask/>

        <GridTaks/>
      </TasksProvider>
    </main>
  );
}