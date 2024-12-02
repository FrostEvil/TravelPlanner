import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import TravelPlannerContent from "@/components/TravelPlannerContent";

function TravelPlannerPage() {
  return (
    <SidebarProvider defaultOpen={false}>
      <main className="w-full">
        <Header />
        <TravelPlannerContent />
      </main>
    </SidebarProvider>
  );
}

export default TravelPlannerPage;
