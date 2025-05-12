import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function PlayerHistory({ seasonStats }: { seasonStats: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Season by Season</CardTitle>
        <CardDescription>Performance across recent seasons</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b'>
                <th className='text-left py-3 px-4 font-medium'>Season</th>
                <th className='text-left py-3 px-4 font-medium'>Team</th>
                <th className='text-center py-3 px-4 font-medium'>
                  Appearances
                </th>
                <th className='text-center py-3 px-4 font-medium'>Goals</th>
                <th className='text-center py-3 px-4 font-medium'>Assists</th>
                <th className='text-center py-3 px-4 font-medium'>
                  G+A per Game
                </th>
              </tr>
            </thead>
            <tbody>
              {seasonStats.map((season, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}
                >
                  <td className='py-3 px-4'>{season.season}</td>
                  <td className='py-3 px-4'>{season.team}</td>
                  <td className='py-3 px-4 text-center'>
                    {season.appearances}
                  </td>
                  <td className='py-3 px-4 text-center'>{season.goals}</td>
                  <td className='py-3 px-4 text-center'>{season.assists}</td>
                  <td className='py-3 px-4 text-center font-medium'>
                    {(
                      (season.goals + season.assists) /
                      season.appearances
                    ).toFixed(2)}
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
