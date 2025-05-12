import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PlayerCondition() {
  return (
    <div className='flex flex-col md:flex-row justify-between gap-4 mb-6'>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='relative w-full sm:w-80'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input placeholder='Search players...' className='pl-10' />
        </div>
        <Select defaultValue='all'>
          <SelectTrigger className='w-full sm:w-40'>
            <SelectValue placeholder='League' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Leagues</SelectItem>
            <SelectItem value='premier-league'>Premier League</SelectItem>
            <SelectItem value='la-liga'>La Liga</SelectItem>
            <SelectItem value='bundesliga'>Bundesliga</SelectItem>
            <SelectItem value='serie-a'>Serie A</SelectItem>
            <SelectItem value='ligue-1'>Ligue 1</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='flex items-center gap-2'>
        <Button variant='outline' size='sm' className='flex items-center gap-1'>
          <Filter className='h-4 w-4' />
          <span>Filters</span>
        </Button>
        <Button variant='outline' size='sm' className='flex items-center gap-1'>
          <ArrowUpDown className='h-4 w-4' />
          <span>Sort</span>
        </Button>
      </div>
    </div>
  );
}
