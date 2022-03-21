import { Request, Response } from 'express';
import { Parser } from 'json2csv';
import { getManager } from 'typeorm';
import { Order } from '../entity/order.entity';

export const Orders = async (req: Request, res: Response) => {
  const take = 15;
  const page = parseInt((req.query.page as string) || '1');

  const orderRepository = getManager().getRepository(Order);

  const [data, total] = await orderRepository.findAndCount({
    take,
    skip: (page - 1) * take,
    relations: ['order_items'],
  });

  res.send({
    data: data.map(order => ({
      id: order.id,
      name: order.name,
      email: order.email,
      total: order.total,
      created_at: order.created_at,
      order_items: order.order_items,
    })),
    meta: {
      total,
      page,
      last_page: Math.ceil(total / take),
    },
  });
};

export const Export = async (req: Request, res: Response) => {
  const parser = new Parser({
    fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity'],
  });

  const orderRepository = getManager().getRepository(Order);
  const orders = await orderRepository.find({ relations: ['order_items'] });
  const json = [];
  orders.forEach(order => {
    json.push({
      ID: order.id,
      Name: order.name,
      Email: order.email,
      'Product Title': '',
      Price: '',
      Quantity: '',
    });

    order.order_items.forEach(item => {
      json.push({
        ID: '',
        Name: '',
        Email: '',
        'Product Title': item.product_title,
        Price: item.price,
        Quantity: item.quantity,
      });
    });
  });

  const csv = parser.parse(json);

  res.header('Content-Type', 'text/csv');
  res.attachment('orders.csv');
  res.send(csv);
};

export const Chart = async (req: Request, res: Response) => {
  const manager = getManager();
  const result = await manager.query(`
  SELECT DATE_FORMAT(created_at, '%Y-%m-%d') as date, sum(price * quantity) as sum
  FROM \`order\` o JOIN order_item oi ON o.id = oi.order_id
  GROUP BY date
  `);

  res.send(result);
};
