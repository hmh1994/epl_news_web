// import { Search, Filter, ArrowUpDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { LeagueComparison, LeagueRankingTable } from "@/components/teams";
import { getTeamRankDetail } from "@/src/entities/teams/apis/get-team-rank-detail";

export default async function RankingsPage() {
  const { teamRankDetail } = await getTeamRankDetail();
  return (
    <div className='min-h-screen bg-background'>
      <div className='bg-gradient-to-b from-muted/50 to-background pt-8 pb-16'>
        <div className='container'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-bold'>Team Rankings</h1>
            <p className='text-muted-foreground'>
              Comprehensive league tables and team standings from top football
              leagues around the world.
            </p>
          </div>
        </div>
      </div>

      <div className='container py-8'>
        <div className='flex flex-col md:flex-row justify-between gap-4 mb-6'>
          <div className='flex flex-col sm:flex-row gap-4'>
            {/* <div className='relative w-full sm:w-80'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input placeholder='Search teams...' className='pl-10' />
            </div> */}
            {/* <Select defaultValue='all'>
              <SelectTrigger className='w-full sm:w-40'>
                <SelectValue placeholder='Season' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>2023/24</SelectItem>
                <SelectItem value='2022-23'>2022/23</SelectItem>
                <SelectItem value='2021-22'>2021/22</SelectItem>
                <SelectItem value='2020-21'>2020/21</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
          {/* <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='flex items-center gap-1'
            >
              <Filter className='h-4 w-4' />
              <span>Filters</span>
            </Button>
            <Button
              variant='outline'
              size='sm'
              className='flex items-center gap-1'
            >
              <ArrowUpDown className='h-4 w-4' />
              <span>Sort</span>
            </Button>
          </div> */}
        </div>

        <LeagueRankingTable teamRankDetail={teamRankDetail} />

        {/* <LeagueComparison /> */}
      </div>
    </div>
  );
}
