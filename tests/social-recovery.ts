import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SocialRecovery } from "../target/types/social_recovery";

describe("social-recovery", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SocialRecovery as Program<SocialRecovery>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
