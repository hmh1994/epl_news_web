import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function PlayerCareer({ careerHistory }: { careerHistory: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Career History</CardTitle>
        <CardDescription>Clubs throughout the player's career</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b'>
                <th className='text-left py-3 px-4 font-medium'>Period</th>
                <th className='text-left py-3 px-4 font-medium'>Club</th>
                <th className='text-center py-3 px-4 font-medium'>
                  Appearances
                </th>
                <th className='text-center py-3 px-4 font-medium'>Goals</th>
                <th className='text-center py-3 px-4 font-medium'>
                  Goals per Game
                </th>
              </tr>
            </thead>
            <tbody>
              {careerHistory.map((club, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}
                >
                  <td className='py-3 px-4'>{club.period}</td>
                  <td className='py-3 px-4'>{club.team}</td>
                  <td className='py-3 px-4 text-center'>{club.appearances}</td>
                  <td className='py-3 px-4 text-center'>{club.goals}</td>
                  <td className='py-3 px-4 text-center font-medium'>
                    {(club.goals / club.appearances).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
