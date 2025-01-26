import { getUserAppointments } from "@/actions/feature/spread/appointment";
import {
	getUserBalance,
	getUserClients,
	getUserPlanInfo,
	getUserTotalProductPrices,
	getUserTransactions,
} from "@/actions/feature/spread/dashboard";
import DashboardCard from "@/components/spread/dashboard/cards";
import { PlanUsage } from "@/components/spread/dashboard/plan-usage";
import InfoBar from "@/components/spread/infobar";
import { Separator } from "@/components/ui/separator";
import CalIcon from "@/components/spread/icons/cal-icon";
import EmailIcon from "@/components/spread/icons/email-icon";
import PersonIcon from "@/components/spread/icons/person-icon";
import { TransactionsIcon } from "@/components/spread/icons/transactions-icon";
import { DollarSign } from "lucide-react";
import React from "react";

type SubscriptionPlan = "PRO" | "STANDARD" | "ULTIMATE" | "FREE";

type Props = {};

const Page = async (props: Props) => {
	const clients = await getUserClients();
	const sales = await getUserBalance();
	const bookings = await getUserAppointments();
	const plan = await getUserPlanInfo();
	const transactions = await getUserTransactions();
	const products = await getUserTotalProductPrices();

	return (
		<>
			<InfoBar />
			<div className="overflow-y-auto w-full chat-window flex-1 h-0">
				<div className="flex gap-5 flex-wrap">
					<DashboardCard
						value={clients || 0}
						title="Potential Clients"
						icon={<PersonIcon />}
					/>
					<DashboardCard
						value={products! * clients! || 0}
						sales
						title="Pipline Value"
						icon={<DollarSign />}
					/>
					<DashboardCard
						value={bookings || 0}
						title="Appointments"
						icon={<CalIcon />}
					/>
					<DashboardCard
						value={sales || 0}
						sales
						title="Total Sales"
						icon={<DollarSign />}
					/>
				</div>
				<div className="w-full grid grid-cols-1 lg:grid-cols-2 py-10">
					<div>
						<div>
							<h2 className="font-bold text-2xl">Plan Usage</h2>
							<p className="text-sm font-light">
								A detailed overview of your metrics, usage,
								customers and more
							</p>
						</div>
						<PlanUsage
							plan={
								["PRO", "STANDARD", "ULTIMATE"].includes(
									plan?.plan as string
								)
									? (plan?.plan as
											| "PRO"
											| "STANDARD"
											| "ULTIMATE")
									: "STANDARD"
							}
							credits={plan?.credits || 0}
							domains={plan?.domains || 0}
							clients={plan?.clients || 0}
						/>
					</div>
					<div className="flex flex-col">
						<div className="w-full flex justify-between items-start mb-5">
							<div className="flex gap-3 items-center">
								<TransactionsIcon />
								<p className="font-bold">Recent Transactions</p>
							</div>
							<p className="text-sm">See more</p>
						</div>
						<Separator orientation="horizontal" />
						{transactions &&
							transactions.data.map((transaction) => (
								<div
									className="flex gap-3 w-full justify-between items-center border-b-2 py-5"
									key={transaction.id}
								>
									<p className="font-bold">
										{
											transaction.calculated_statement_descriptor
										}
									</p>
									<p className="font-bold text-xl">
										${transaction.amount / 100}
									</p>
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
