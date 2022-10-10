import { registerEnumType } from 'type-graphql';

export enum Status {
  TO_DO,
  IN_PROGRESS,
  DONE,
  ARCHIVED,
}

registerEnumType(Status, {
  name: 'Status',
});
