import { BookOpen, Building2Icon, LayoutDashboardIcon } from "lucide-react";
import DashboardCard from "./DashboardCard";
import AnalyticsChart from "./Charts";
import RecentNotes from "./RecentNotes";
import RecentUsers from "./RecentUser";



export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Total Notes"
          value="25,420"
          change="+12%"
          icon={<BookOpen size={28} />}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Universities"
          value="150"
          change="+4%"
          icon={<Building2Icon size={28} />}
          color="bg-violet-600"
        />
      </div>
      {/* Stats */}

      <AnalyticsChart />
      {/* Charts */}
        <RecentNotes/>

        <RecentUsers/>
      {/* Tables */}

      {/* Quick Actions */}
    </div>
  );
}