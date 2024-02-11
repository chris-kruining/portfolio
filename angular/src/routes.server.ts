import { Express, Request, Response } from 'express';
import { Injector, runInInjectionContext } from '@angular/core';
import InvoiceService from './app/feature/sales/invoices/service';
import { load as loadInvoices } from 'src/app/feature/sales/invoices/invoices.component.server';
import { load as loadInvoice } from 'src/app/feature/sales/invoices/invoice.component.server';
import SuperJSON from 'superjson';
import { serialize } from './app/core/utilities/binary';
import { invoice } from './app/feature/sales/invoices';

export type PageServerLoad = {
  params: Request['params'],
  req: Request, 
  res: Response,
};

export default (server: Express) => {
  const injector = Injector.create({
    providers: [
      InvoiceService,
    ],
  });

  const runServerFunction = async (load: (params: PageServerLoad) => Promise<any>, req: Request, res: Response) => {
    await runInInjectionContext(injector, async () => {
      const data = await load({
        params: req.params,
        req,
        res
      });

      res.send(SuperJSON.stringify(data));
    });
  };

  server.get('/__api/kaas', async (req, res) => {
    await runInInjectionContext(injector, async () => {
      const data = await loadInvoice({
        params: { id: '2' },
        req,
        res
      });

      res.send(serialize(invoice, data!));
    });
  });

  server.get('/__api/sales/invoices', async (req, res) => {
    await runServerFunction(loadInvoices, req, res);
  });

  server.get('/__api/sales/invoices/:id', async (req, res) => {
    await runServerFunction(loadInvoice, req, res);
  });

  server.get('/__api/**', async (req, res) => {
    res.status(404).send('');
  });
};