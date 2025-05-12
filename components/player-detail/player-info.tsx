import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function PlayerInfo({ player }: { player: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Background and personal details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <h4 className='text-sm font-medium text-muted-foreground'>
                Full Name
              </h4>
              <p>{player.fullName}</p>
            </div>
            <div>
              <h4 className='text-sm font-medium text-muted-foreground'>
                Date of Birth
              </h4>
              <p>{player.dateOfBirth}</p>
            </div>
            <div>
              <h4 className='text-sm font-medium text-muted-foreground'>
                Place of Birth
              </h4>
              <p>{player.placeOfBirth}</p>
            </div>
            <div>
              <h4 className='text-sm font-medium text-muted-foreground'>
                Nationality
              </h4>
              <p>{player.nationality}</p>
            </div>
            <div>
              <h4 className='text-sm font-medium text-muted-foreground'>
                Height
              </h4>
              <p>{player.height}</p>
            </div>
            <div>
              <h4 className='text-sm font-medium text-muted-foreground'>
                Weight
              </h4>
              <p>{player.weight}</p>
            </div>
            <div>
              <h4 className='text-sm font-medium text-muted-foreground'>
                Preferred Foot
              </h4>
              <p>{player.foot}</p>
            </div>
            <div>
              <h4 className='text-sm font-medium text-muted-foreground'>Age</h4>
              <p>{player.age}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
