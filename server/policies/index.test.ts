import { buildUser, buildTeam } from "@server/test/factories";
import { flushdb } from "@server/test/support";
import { serialize } from "./index";

beforeEach(() => flushdb());

it("should serialize policy", async () => {
  const user = await buildUser();
  const response = serialize(user, user);
  expect(response.update).toEqual(true);
  expect(response.delete).toEqual(true);
});

it("should serialize domain policies on Team", async () => {
  const team = await buildTeam();
  const user = await buildUser({
    teamId: team.id,
  });
  const response = serialize(user, team);
  expect(response.createDocument).toEqual(true);
  expect(response.inviteUser).toEqual(false);
});
