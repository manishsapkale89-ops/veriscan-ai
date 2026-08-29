import { Button } from "@/components/shared/Button";
import { GlassCard } from "@/components/shared/GlassCard";
import { Modal } from "@/components/shared/Modal";
import { PageHeader } from "@/components/shared/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import {
  Bell,
  Check,
  KeyRound,
  Link2,
  Moon,
  ShieldCheck,
  Sun,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";

interface ProfileField {
  id: string;
  label: string;
  value: string;
}

interface NotificationPref {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const initialProfile: ProfileField[] = [
  { id: "name", label: "Name", value: "Aarav Mehta" },
  { id: "email", label: "Email", value: "aarav.mehta@veriscan.ai" },
  { id: "organization", label: "Organization", value: "VeriScan Labs" },
  { id: "role", label: "Role", value: "Security Analyst" },
];

const initialNotifications: NotificationPref[] = [
  {
    id: "suspicious",
    title: "Email alerts for suspicious documents",
    description:
      "Get notified instantly when a document is flagged as suspicious or fake.",
    enabled: true,
  },
  {
    id: "weekly",
    title: "Weekly summary report",
    description:
      "A digest of verification activity and confidence trends every Monday.",
    enabled: true,
  },
  {
    id: "updates",
    title: "New feature updates",
    description:
      "Product announcements and improvements to the VeriScan platform.",
    enabled: false,
  },
  {
    id: "security",
    title: "Security alerts",
    description:
      "Critical security notices about your account and connected services.",
    enabled: true,
  },
];

function SectionHeading({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-gradient-subtle flex size-10 shrink-0 items-center justify-center rounded-xl text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <h2 className="font-display text-base font-semibold">{title}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const toast = useToast();

  const [profile, setProfile] = useState<ProfileField[]>(initialProfile);
  const [notifications, setNotifications] =
    useState<NotificationPref[]>(initialNotifications);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const updateProfile = (id: string, value: string) => {
    setProfile((current) =>
      current.map((field) => (field.id === id ? { ...field, value } : field)),
    );
  };

  const toggleNotification = (id: string) => {
    setNotifications((current) =>
      current.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref,
      ),
    );
  };

  const handleSaveProfile = () => {
    toast.success(
      "Profile updated",
      "Your changes have been saved successfully.",
    );
  };

  const handleDeleteAccount = () => {
    setDeleteOpen(false);
    toast.error(
      "Account deletion requested",
      "This action is disabled in the demo.",
    );
  };

  return (
    <div className="bg-aurora min-h-full">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <PageHeader
          title="Settings"
          subtitle="Manage your profile, preferences, and account security."
        />

        {/* Profile */}
        <GlassCard className="p-5 sm:p-6" data-ocid="settings.profile_card">
          <div className="flex flex-col gap-6">
            <SectionHeading
              icon={<User className="size-5" />}
              title="Profile"
              description="Your personal information and organization details."
            />

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
              <Avatar className="size-16">
                <AvatarImage
                  src="/assets/images/avatar.png"
                  alt="Profile avatar"
                />
                <AvatarFallback className="bg-gradient-primary font-display text-lg text-primary-foreground">
                  AM
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <p className="font-display text-lg font-semibold">
                  {profile.find((f) => f.id === "name")?.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {profile.find((f) => f.id === "email")?.value}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {profile.map((field) => (
                <div key={field.id} className="flex flex-col gap-1.5">
                  <Label htmlFor={`profile.${field.id}`}>{field.label}</Label>
                  <Input
                    id={`profile.${field.id}`}
                    data-ocid={`settings.profile.${field.id}`}
                    value={field.value}
                    onChange={(e) => updateProfile(field.id, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                data-ocid="settings.save_button"
                onClick={handleSaveProfile}
              >
                <Check className="size-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* Theme */}
        <GlassCard className="p-5 sm:p-6" data-ocid="settings.theme_card">
          <div className="flex flex-col gap-6">
            <SectionHeading
              icon={<Moon className="size-5" />}
              title="Appearance"
              description="Choose how VeriScan looks on your device."
            />

            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium">Theme</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Currently using{" "}
                  <span className="capitalize text-foreground">{theme}</span>{" "}
                  mode.
                </p>
              </div>

              <fieldset
                data-ocid="settings.theme_toggle"
                className="bg-muted flex items-center gap-1 rounded-full p-1"
                aria-label="Theme selection"
              >
                <button
                  type="button"
                  data-ocid="settings.theme_light"
                  aria-label="Light theme"
                  aria-pressed={theme === "light"}
                  onClick={() => setTheme("light")}
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full transition-smooth",
                    theme === "light"
                      ? "bg-card text-primary shadow-subtle"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Sun className="size-4" />
                </button>
                <button
                  type="button"
                  data-ocid="settings.theme_dark"
                  aria-label="Dark theme"
                  aria-pressed={theme === "dark"}
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full transition-smooth",
                    theme === "dark"
                      ? "bg-card text-primary shadow-subtle"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Moon className="size-4" />
                </button>
              </fieldset>
            </div>
          </div>
        </GlassCard>

        {/* Notifications */}
        <GlassCard
          className="p-5 sm:p-6"
          data-ocid="settings.notifications_card"
        >
          <div className="flex flex-col gap-6">
            <SectionHeading
              icon={<Bell className="size-5" />}
              title="Notifications"
              description="Choose which alerts you want to receive."
            />

            <div className="flex flex-col divide-y divide-border">
              {notifications.map((pref) => (
                <div
                  key={pref.id}
                  className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="font-medium">{pref.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {pref.description}
                    </p>
                  </div>
                  <Switch
                    data-ocid={`settings.notification.${pref.id}`}
                    checked={pref.enabled}
                    onCheckedChange={() => toggleNotification(pref.id)}
                    aria-label={pref.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Account */}
        <GlassCard className="p-5 sm:p-6" data-ocid="settings.account_card">
          <div className="flex flex-col gap-6">
            <SectionHeading
              icon={<ShieldCheck className="size-5" />}
              title="Account"
              description="Security and connection settings for your account."
            />

            <div className="flex flex-col divide-y divide-border">
              <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
                <div className="flex items-center gap-3">
                  <KeyRound className="size-5 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="font-medium">Change password</p>
                    <p className="text-sm text-muted-foreground">
                      Update your account password.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="settings.change_password"
                  onClick={() =>
                    toast.info(
                      "Change password",
                      "Password reset is disabled in the demo.",
                    )
                  }
                >
                  Update
                </Button>
              </div>

              <div className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="size-5 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="font-medium">Two-factor authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                </div>
                <Switch
                  data-ocid="settings.two_factor"
                  defaultChecked
                  aria-label="Two-factor authentication"
                />
              </div>

              <div className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                  <Link2 className="size-5 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="font-medium">Connected accounts</p>
                    <p className="text-sm text-muted-foreground">
                      Manage linked identity providers and services.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="settings.connected_accounts"
                  onClick={() =>
                    toast.info(
                      "Connected accounts",
                      "No external accounts connected.",
                    )
                  }
                >
                  Manage
                </Button>
              </div>

              <div className="flex items-center justify-between gap-4 py-4 last:pb-0">
                <div className="flex items-center gap-3">
                  <Trash2 className="size-5 text-destructive" />
                  <div className="min-w-0">
                    <p className="font-medium text-destructive">Danger zone</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data.
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  data-ocid="settings.delete_account"
                  onClick={() => setDeleteOpen(true)}
                >
                  Delete account
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <Modal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete account?"
        description="This action is permanent and cannot be undone. All your verification history and settings will be removed."
        footer={
          <>
            <Button
              variant="outline"
              data-ocid="settings.delete_cancel"
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              data-ocid="settings.delete_confirm"
              onClick={handleDeleteAccount}
            >
              <Trash2 className="size-4" />
              Delete account
            </Button>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to permanently delete your VeriScan account?
        </p>
      </Modal>
    </div>
  );
}
