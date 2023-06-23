import { useEffect, useState, useCallback } from "react";
import { AggregatedTicket } from "../models/shared.models";
import { useAppSelector } from "./reduxHooks";

function useBasketTickets() {
  const basketTicket = useAppSelector((state) => state.basket.basket?.items);
  const [aggreateds, setAggreateds] = useState<AggregatedTicket[]>([]);

  const getQuantity = useCallback(
    (tikcetTypeId: string, flightLoadId: string) => {
      const findedAggregate = aggreateds.find(
        (agg) =>
          agg.flightLoadId === flightLoadId && agg.ticketTypeId === tikcetTypeId
      );
      return findedAggregate?.ticketMembers.length || 0;
    },
    [aggreateds]
  );

  const getAggregate = useCallback(
    (tikcetTypeId: string, flightLoadId: string) => {
      const findedAggregate = aggreateds.find(
        (agg) =>
          agg.flightLoadId === flightLoadId && agg.ticketTypeId === tikcetTypeId
      );
      return findedAggregate;
    },
    [aggreateds]
  );

  useEffect(() => {
    function getAggregatedTickets(): AggregatedTicket[] {
      const tempAggreateds: AggregatedTicket[] = [];
      basketTicket?.forEach((item) => {
        const findedAggregate = tempAggreateds.find(
          (agg) =>
            agg.flightLoadId === item.flightLoadId &&
            agg.ticketTypeId === item.ticketTypeId
        );
        if (findedAggregate) {
          findedAggregate.amount += item.amount;
          findedAggregate.ticketMembers.push(item);
        } else {
          const aggregated: AggregatedTicket = {
            flightLoadId: item.flightLoadId,
            flightNumber: item.flightNumber,
            ticketTypeId: item.ticketTypeId,
            type: item.type,
            amount: item.amount,
            ticketMembers: [item],
          };
          tempAggreateds.push(aggregated);
        }
      });
      return tempAggreateds;
    }

    setAggreateds(getAggregatedTickets());
  }, [basketTicket]);

  return { aggregatedTickets: aggreateds,getQuantity, getAggregate };
}

export default useBasketTickets;
